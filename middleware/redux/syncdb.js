import PouchDB from 'pouchdb';

import { ADD_COUNTDOWN, REMOVE_COUNTDOWN } from '../../actions';

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

    const newState = store.getState();

    switch (action.type) {
      case ADD_COUNTDOWN: {
        const newCountdown = newState.countdowns[newState.countdowns.length - 1];
        localDB.put({
          _id: newCountdown.id,
          time: newCountdown.time,
        });
        break;
      }
      case REMOVE_COUNTDOWN:
        localDB.get(action.id).then(doc => localDB.remove(doc));
        break;
      default:
        break;
    }
    return result;
  };
};

export default syncDB;
