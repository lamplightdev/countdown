export const ADD_COUNTDOWN = 'ADD_COUNTDOWN';
export const REMOVE_COUNTDOWN = 'REMOVE_COUNTDOWN';

export const SET_UI_STATE = 'SET_UI_STATE';

export function addCountdown(time, start) {
  return {
    type: ADD_COUNTDOWN,
    time,
    start,
  };
}

export function removeCountdown(id) {
  return {
    type: REMOVE_COUNTDOWN,
    id,
  };
}

export function setUIState(name, value) {
  return {
    type: SET_UI_STATE,
    name,
    value,
  };
}
