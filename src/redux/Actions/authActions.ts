import { SET_ERRORS, SET_USER, LOADING_UI, CLEAR_ERRORS, SET_SUCCESS, SET_UNAUTHENTICATED } from '../types';
import axios from 'axios';

export interface IUserDto {
  email: string;
  password: string;
}

export interface IUser {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
}

export const loginUser = (userData: IUserDto, history:any) => (dispatch) => {
  dispatch({ type: LOADING_UI });

  setAuthorizationHeader(
    'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJPbmxpbmUgSldUIEJ1aWxkZXIiLCJpYXQiOjE2Mjk4OTQzODUsImV4cCI6MTY2MTQzMDM5MSwiYXVkIjoid3d3LmV4YW1wbGUuY29tIiwic3ViIjoianJvY2tldEBleGFtcGxlLmNvbSIsIkdpdmVuTmFtZSI6IkpvaG4iLCJTdXJuYW1lIjoiRG9lIiwiRW1haWwiOiJKb2huRG9lQGdtYWlsLmNvbSIsIlJvbGUiOlsiTWFuYWdlciIsIlByb2plY3QgQWRtaW5pc3RyYXRvciJdfQ.t0EI9viChURQtGQRRYKEFEdJG-u8pxz79Xsyf8aosvc',
  );

  dispatch(
    setUserData({ firstName: 'John', lastName: 'Doe', email: 'Johndoe@gmail.com', phoneNumber: '+254714382366' }),
  );
  dispatch({
    type: SET_SUCCESS,
    payload: `welcome back John`,
  });
  history.push('/dashboard');
  // Make axios call

  /**
   *  axios
        .post("/accounts/login", userData)
        .then((res) => {
            setAuthorizationHeader(res.data.token);

            dispatch(setUserData(res.data.user));
            dispatch({
                type: SET_SUCCESS,
                payload: `welcome back ${res.data.user.first_name}`,
            });
            history.push("/dashboard");
        })
        .catch((err) => {
            console.log(err);
            if (err.response) {
                dispatch({
                    type: SET_ERRORS,
                    payload: err.response.data,
                });
            }
        });
   */
};
export const registerUser = (userData:Partial<IUser>,history, actions) => (dispatch) => {
  
  actions.resetForm();
  dispatch({
    type: SET_SUCCESS,
    payload: `welcome back John`,
  });
  history.push('/login');
};


export const registerCompany = (companyData, history,) => dispatch =>{
  console.log('');
  
};

// update user details
export const updateUserProfile = () => {
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
