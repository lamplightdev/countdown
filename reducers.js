import { combineReducers } from 'redux';
import { ADD_COUNTDOWN, REMOVE_COUNTDOWN, SET_UI_STATE } from './actions';


const countdowns = (state = [], action) => {
  switch (action.type) {
    case ADD_COUNTDOWN:
      let count = 0;
      if (state.length) {
        const lastId = state[state.length - 1].id;
        const dashPos = lastId.lastIndexOf('-');
        count = parseInt(lastId.substr(dashPos + 1), 10) + 1;
      }

      return [
        ...state,
        {
          id: `countdown-${count}`,
          time: action.time,
        },
      ];

    case REMOVE_COUNTDOWN:
      return state.filter(countdown => countdown.id !== action.id).map(countdown =>
        Object.assign({}, countdown)
      );

    default:
      return state;
  }
};

const data = (state = [], action) => {
  switch (action.type) {
    default:
      return state;
  }
};

const ui = (state = {}, action) => {
  switch (action.type) {
    case SET_UI_STATE:
      return Object.assign({}, state, {
        [action.name]: action.value,
      });
    default:
      return state;
  }
};

const countdownApp = combineReducers({
  countdowns,
  data,
  ui,
});

export default countdownApp;
