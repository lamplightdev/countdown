import React from 'react';
import { renderToString } from 'react-dom/server';
import { match, RouterContext } from 'react-router';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';

import countdownApp from '../reducers';
import { setUIState } from '../actions';
import routes from '../routes';
import logger from '../middleware/redux/logger';
import syncDB from '../middleware/redux/syncDB';
import promiseMiddleware from 'redux-promise';

import PouchDB from 'pouchdb';

const db = new PouchDB('http://localhost:5984/countdowns');

const renderFullPage = (html, initialState) => (`
  <!doctype html>
  <html>
    <head>
      <meta name="viewport" content="width=device-width, initial-scale=1.0">

      <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">
      <link rel="stylesheet" href="https://code.getmdl.io/1.1.3/material.indigo-red.min.css">
      <link rel="stylesheet" href="/css/app.css">
      <script defer src="https://code.getmdl.io/1.1.3/material.min.js"></script>
    </head>
    <body>
      <div id='root'>${html}</div>
      <script>
        window.__INITIAL_STATE__ = ${JSON.stringify(initialState)};
      </script>
      <script src='/js/build/app.js'></script>
    </body>
  </html>
`);


const Router = (req, res) => {
  let store;

  db.allDocs({
    include_docs: true,
    descending: true,
  })
  .then(countdownDocs => {
    store = createStore(countdownApp, {
      countdowns: countdownDocs.rows.map(doc => (
        {
          id: doc.doc._id,
        }
      )),
      data: [],
      ui: {},
      now: Math.ceil(new Date().getTime() / 1000) * 1000,
    }, applyMiddleware(promiseMiddleware, logger, syncDB()));
  })
  .then(() => {
    Object.keys(req.query).forEach(key => {
      store.dispatch(setUIState(key, true));
    });

    const location = {
      pathname: req.url,
      query: req.query,
      state: {
        post: req.body,
      },
    };

    match({ routes: routes(store), location }, (error, redirectLocation, renderProps) => {
      if (error) {
        res.status(500).send(error.message);
      } else if (redirectLocation) {
        // TODO: should be checking in redirectLocation.search is non empty too
        let search = '';
        const ui = store.getState().ui;
        const searchKeys = Object.keys(ui);
        if (searchKeys.length) {
          search = searchKeys.reduce((previous, current) => {
            if (ui[current]) {
              return `${previous}${current}&`;
            }
            return previous;
          }, '?');
          search = search.substring(0, search.length - 1);
        }

        res.redirect(302, redirectLocation.pathname + search);
      } else if (renderProps) {
        res.status(200).send(renderFullPage(renderToString(
          <Provider store={store}>
            <RouterContext {...renderProps} />
          </Provider>
        ), store.getState()));
      } else {
        res.status(404).send('Not found');
      }
    });
  })
  .catch(error => {
    res.status(500).send(error.message);
  });
};

export default Router;
