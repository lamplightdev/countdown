import React from 'react';
import { renderToString } from 'react-dom/server';
import { match, RouterContext } from 'react-router';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';

import countdownApp from '../reducers';
import { addCountdown, removeCountdown, setUIState } from '../actions';
import routes from '../routes';
import logger from '../middleware/redux/logger';
import syncDB from '../middleware/redux/syncdb';
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
  })
  .then(countdownDocs => {
    store = createStore(countdownApp, {
      countdowns: countdownDocs.rows.map(doc => (
        {
          id: doc.doc._id,
          time: doc.doc.time,
        }
      )),
      data: [],
    }, applyMiddleware(promiseMiddleware, logger, syncDB()));
  })
  .then(() => {
    const location = {
      pathname: req.url,
      state: {
        ...req.body,
        dispatch: store.dispatch,
      },
    };

    match({ routes, location }, (error, redirectLocation, renderProps) => {
      if (error) {
        res.status(500).send(error.message);
      } else if (redirectLocation) {
        res.redirect(302, redirectLocation.pathname + redirectLocation.search);
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
