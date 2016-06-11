import PouchDB from 'pouchdb';

import { ADD_COUNTDOWN, REMOVE_COUNTDOWN } from '../../actions';

const localDB = new PouchDB('countdowns');
const remoteDB = new PouchDB('http://localhost:5984/countdowns', {
  ajax: {
    withCredentials: false,
  },
});

localDB.sync(remoteDB, {
  live: true,
  retry: true,
});

const syncDb = store => next => action => {
  const result = next(action);

  const newState = store.getState();

  const newCountdown = newState.countdowns[newState.countdowns.length - 1];

  switch (action.type) {
    case ADD_COUNTDOWN:
      localDB.put({
        _id: newCountdown.id,
        time: newCountdown.time,
      });
      break;
    default:
      break;
  }
  return result;
};

export default syncDb;
