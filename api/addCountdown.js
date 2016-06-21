import { addCountdown, setUIState } from '../actions';

const add = store => (nextState, replace, callback) => {
  const time = nextState.location.state.post.time;

  const promises = [];

  const valueInt = parseInt(time, 10);
  if (valueInt > 9) {
    promises.push(store.dispatch(addCountdown(valueInt)));
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
