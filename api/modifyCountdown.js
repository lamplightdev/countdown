import { modifyCountdown } from '../actions';

const modify = store => (nextState, replace, callback) => {
  const oldEnd = Number(nextState.location.state.post.id);
  const plus = Number(nextState.location.state.post.plus);
  let now = Number(nextState.location.state.post.now);
  if (!now) {
    now = new Date().getTime();
  }

  let newEnd = oldEnd + plus;
  let length = newEnd - now;

  if (length < plus) {
    newEnd = now + plus;
    length = plus;
  }

  const promises = [];

  promises.push(store.dispatch(modifyCountdown(oldEnd, newEnd, length)));

  Promise.all(promises).then(() => {
    replace('/');
    callback();
  });
};

export default modify;
