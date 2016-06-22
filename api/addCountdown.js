import { addCountdown, setUIState } from '../actions';

const add = store => (nextState, replace, callback) => {
  const time = nextState.location.state.post.time;

  const promises = [];

  if (time.match(/^\d+[smhdw]?$/)) {
    promises.push(store.dispatch(addCountdown(parseInt(time, 10), Math.floor(Date.now() / 1000))));
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
