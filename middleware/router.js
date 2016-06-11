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

import PouchDB from 'pouchdb';

const db = new PouchDB('http://localhost:5984/countdowns');

const renderFullPage = (html, initialState) => {
  return `
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
  `;
};


const Router = (req, res) => {
  let store;

  db.allDocs({
    include_docs: true,
  }).then(countdownDocs => {
    store = createStore(countdownApp, {
      countdowns: countdownDocs.rows.map(doc => (
        {
          id: doc.doc._id,
          time: doc.doc.time,
        }
      )),
      data: [],
    }, applyMiddleware(logger, syncDB()));
  }).then(() => {
    match({ routes, location: req.url }, (error, redirectLocation, renderProps) => {
      if (error) {
        res.status(500).send(error.message);
      } else if (redirectLocation) {
        res.redirect(302, redirectLocation.pathname + redirectLocation.search);
      } else if (renderProps) {
        switch (req.method) {
          case 'GET':
            break;
          case 'POST':
            if (req.body.action === 'remove' && req.body.id) {
              store.dispatch(removeCountdown(req.body.id));
            } else if (typeof req.body.time !== 'undefined') {
              const valueInt = parseInt(req.body.time, 10);
              if (valueInt > 9) {
                store.dispatch(addCountdown(valueInt));
                store.dispatch(setUIState('invalid', false));
              } else {
                store.dispatch(setUIState('invalid', true));
              }
            }
            break;
          default:
            break;
        }

        res.status(200).send(renderFullPage(renderToString(
          <Provider store={store}>
            <RouterContext {...renderProps} />
          </Provider>
        ), store.getState()));
      } else {
        res.status(404).send('Not found');
      }
    });
  });
};

export default Router;
