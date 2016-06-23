import { combineReducers } from 'redux';
import { ADD_COUNTDOWN, REMOVE_COUNTDOWN, MODIFY_COUNTDOWN, SET_UI_STATE } from './actions';


const countdowns = (state = [], action) => {
  switch (action.type) {
    case ADD_COUNTDOWN: {
      return [
        ...state,
        {
          id: action.endTime,
        },
      ];
    }

    case REMOVE_COUNTDOWN:
      return state.filter(countdown => countdown.id !== action.id).map(countdown =>
        Object.assign({}, countdown)
      );

    case MODIFY_COUNTDOWN:
      return state.map(countdown => {
        if (countdown.id === action.oldId) {
          return {
            ...countdown,
            id: action.newId,
          }
        }
        return { ...countdown };
      });

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

const now = (state = 0, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

const countdownApp = combineReducers({
  countdowns,
  data,
  ui,
  now,
});

export default countdownApp;
