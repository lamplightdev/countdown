import { modifyCountdown } from '../actions';

const modify = store => (nextState, replace, callback) => {
  const oldId = nextState.location.state.post.id;
  const plus = nextState.location.state.post.plus;

  const newId = new Date(new Date(oldId).getTime() + plus).toJSON();

  const promises = [];

  promises.push(store.dispatch(modifyCountdown(oldId, newId)));

  Promise.all(promises).then(() => {
    replace('/');
    callback();
  });
};

export default modify;
