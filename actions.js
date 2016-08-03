export const ADD_COUNTDOWN = 'ADD_COUNTDOWN';
export const REMOVE_COUNTDOWN = 'REMOVE_COUNTDOWN';
export const MODIFY_COUNTDOWN = 'MODIFY_COUNTDOWN';

export const UPDATE_NOW = 'UPDATE_NOW';

export const SET_UI_STATE = 'SET_UI_STATE';

export function addCountdown(endTime, length) {
  return {
    type: ADD_COUNTDOWN,
    endTime,
    length,
  };
}

export function removeCountdown(id) {
  return {
    type: REMOVE_COUNTDOWN,
    id,
  };
}

export function modifyCountdown(oldId, newId, length) {
  return {
    type: MODIFY_COUNTDOWN,
    oldId,
    newId,
    length,
  };
}

export function updateNow(now) {
  return {
    type: UPDATE_NOW,
    now,
  };
}

export function setUIState(name, value) {
  return {
    type: SET_UI_STATE,
    name,
    value,
  };
}
