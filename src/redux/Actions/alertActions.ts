import {
    SET_ERRORS,
    LOADING_UI,
    CLEAR_ERRORS,
    SET_SUCCESS,
    CLEAR_SUCCESS,
} from "../types";

// password reset
export const setSuccess = (message) => (dispatch) => {
    dispatch({
        type: SET_SUCCESS,
        payload: message,
    });
};

export const clearSuccess = () => (dispatch) => {
    dispatch({ type: CLEAR_SUCCESS });
    dispatch({ type: CLEAR_ERRORS });
};

export const setErrors = (message) => (dispatch) => {
    dispatch({
        type: SET_ERRORS,
        payload: message,
    });
};
