import { addCountdown, setUIState, updateNow } from '../actions';

const add = store => (nextState, replace, callback) => {
  const time = nextState.location.state.post.time;
  let now = Number(nextState.location.state.post.now);
  if (!now) {
    now = new Date().getTime();
  }

  const promises = [];

  if (time.match(/^\d+[smhdw]?$/)) {
    const endTime = now + time * 1000;
    promises.push(store.dispatch(updateNow(now)));
    promises.push(store.dispatch(addCountdown(endTime, time * 1000)));
    promises.push(store.dispatch(setUIState('invalid', false)));
  } else {
    promises.push(store.dispatch(setUIState('invalid', true)));
  }

  Promise.all(promises).then(() => {
    replace({
      pathname: '/',
    });
    callback();
  });
};

export default add;
