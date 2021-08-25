import {
  SET_USER,
  SET_HR_STATS,
  SET_AUTHENTICATED,
  SET_UNAUTHENTICATED,
  SET_COMPANY_DATA,
  UPDATE_PROFILE,
  UPDATE_COMPANY,
} from '../types';

const initialState = {
  user: {},
  authenticated: false,
  company: {},
  hrStats: null,
};

const auth = (state = initialState, action) => {
  switch (action.type) {
    case SET_AUTHENTICATED:
      console.log(typeof state.user);
      return {
        ...state,
        authenticated: Object.keys(state.user).length > 0 ? true : false,
      };
    case SET_UNAUTHENTICATED:
      return {
        ...state,
        user: {},
        authenticated: false,
        company: null,
        hrStats: null,
      };
    case SET_USER:
      return {
        ...state,
        authenticated: true,
        user: action.payload,
      };

    case UPDATE_PROFILE:
      return {
        ...state,
        user: {
          ...state.user,
          ...action.payload,
        },
      };
    case SET_HR_STATS:
      return {
        ...state,
        hrStats: action.payload,
      };
    case SET_COMPANY_DATA:
      return {
        ...state,
        company: action.payload,
      };
    case UPDATE_COMPANY:
      return {
        ...state,
        company: {
          ...state.company,
          ...action.payload,
        },
      };
    default:
      return state;
  }
};

export default auth;
