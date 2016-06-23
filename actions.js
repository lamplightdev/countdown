export const ADD_COUNTDOWN = 'ADD_COUNTDOWN';
export const REMOVE_COUNTDOWN = 'REMOVE_COUNTDOWN';
export const MODIFY_COUNTDOWN = 'MODIFY_COUNTDOWN';

export const SET_UI_STATE = 'SET_UI_STATE';

export function addCountdown(endTime) {
  return {
    type: ADD_COUNTDOWN,
    endTime,
  };
}

export function removeCountdown(id) {
  return {
    type: REMOVE_COUNTDOWN,
    id,
  };
}

export function modifyCountdown(oldId, newId) {
  return {
    type: MODIFY_COUNTDOWN,
    oldId,
    newId,
  };
}

export function setUIState(name, value) {
  return {
    type: SET_UI_STATE,
    name,
    value,
  };
}
