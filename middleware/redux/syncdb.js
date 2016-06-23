import PouchDB from 'pouchdb';

import { ADD_COUNTDOWN, REMOVE_COUNTDOWN, MODIFY_COUNTDOWN } from '../../actions';

const syncDB = (client = false) => {
  let localDB;

  if (client) {
    localDB = new PouchDB('countdowns');
    const remoteDB = new PouchDB('http://localhost:5984/countdowns');

    localDB.sync(remoteDB, {
      live: true,
      retry: true,
    });
  } else {
    localDB = new PouchDB('http://localhost:5984/countdowns');
  }

  return store => next => action => {
    const result = next(action);

    // const newState = store.getState();

    let promise = Promise.resolve();

    switch (action.type) {
      case ADD_COUNTDOWN: {
        promise = promise.then(() => (
          localDB.put({
            _id: action.endTime,
          })
        ));
        break;
      }
      case REMOVE_COUNTDOWN:
        promise = promise.then(() => (
          localDB.get(action.id).then(doc => localDB.remove(doc))
        ));
        break;
      case MODIFY_COUNTDOWN:
        promise = promise.then(() => (
          localDB.put({
            _id: action.newId,
          })
          .then(() => localDB.get(action.oldId))
          .then(doc => localDB.remove(doc))
        ));
        break;
      default:
        break;
    }

    return promise.then(() => result);
  };
};

export default syncDB;
