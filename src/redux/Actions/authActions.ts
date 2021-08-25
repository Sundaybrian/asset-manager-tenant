import { SET_ERRORS, SET_USER, LOADING_UI, CLEAR_ERRORS, SET_SUCCESS, SET_UNAUTHENTICATED } from '../types';
import axios from 'axios';

export const loginUser = () => {
  console.log('');
};
export const registerUser = () => {
  console.log('');
};

// update user details
export const updateUserProfile = () => {
  console.log('');
};

export const registerCompany = (companyData, history) => {
  console.log('');
};

// utils
const setUserData = (user) => ({
  type: SET_USER,
  payload: user,
});

const setAuthorizationHeader = (token) => {
  const _token = `Bearer ${token}`;
  localStorage.setItem('token', _token);
  axios.defaults.headers.common['Authorization'] = _token;
};

export const logoutUser = () => (dispatch) => {
  localStorage.clear();
  delete axios.defaults.headers.common['Authorization'];
  dispatch({ type: SET_UNAUTHENTICATED });
  window.location.href = '/';
};
