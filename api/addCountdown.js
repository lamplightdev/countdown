import { addCountdown, setUIState } from '../actions';

const add = store => (nextState, replace, callback) => {
  const time = nextState.location.state.post.time;
  const now = nextState.location.state.post.now;

  const promises = [];

  if (time.match(/^\d+[smhdw]?$/)) {
    const endTime = now + time * 1000;

    promises.push(store.dispatch(addCountdown(new Date(endTime).toJSON(), time * 1000)));
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
