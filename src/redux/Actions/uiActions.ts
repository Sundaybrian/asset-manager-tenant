import { SET_ERRORS, CLEAR_ERRORS } from '../types';

export const errorAlert = (payload) => (dispatch) => {
  dispatch({
    type: SET_ERRORS,
    payload,
  });

  dispatch({ type: CLEAR_ERRORS });
};
