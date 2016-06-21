import { removeCountdown } from '../actions';

const remove = store => (nextState, replace, callback) => {
  const id = nextState.location.state.post.id;

  const promises = [];

  promises.push(store.dispatch(removeCountdown(id)));

  Promise.all(promises).then(() => {
    replace('/');
    callback();
  });
};

export default remove;
