import {
    SET_ERRORS,
    CLEAR_ERRORS,
    LOADING_UI,
    SET_SUCCESS,
    LOADING_DATA,
    STOP_LOADING_DATA,
} from "../types";

const initialState = {
    loading: false,
    errors: null,
    severity: null,
    successMessage: null,
    loadingData: false,
};

const ui = (state = initialState, action) => {
    switch (action.type) {
        case SET_ERRORS:
            return {
                ...state,
                errors: action.payload,
                loading: false,
                severity: "error",
            };
        case CLEAR_ERRORS:
            return {
                ...state,
                loading: false,
                errors: null,
                severity: null,
                successMessage: null,
            };
        case LOADING_UI:
            return {
                ...state,
                loading: true,
            };
        case LOADING_DATA: {
            return {
                ...state,
                loadingData: true,
            };
        }
        case STOP_LOADING_DATA: {
            return {
                ...state,
                loadingData: false,
            };
        }
        case SET_SUCCESS:
            return {
                ...state,
                errors: null,
                severity: "success",
                successMessage: action.payload,
                loading: false,
            };
        default:
            return state;
    }
};

export default ui;
