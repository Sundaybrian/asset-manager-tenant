import { combineReducers } from 'redux';
import auth from './authReducer';
import ui from './uiReducer';
import { firebaseReducer } from 'react-redux-firebase';

const rootReducer = combineReducers({
  auth,
  ui,
  firebase: firebaseReducer,
});


export default rootReducer

export type RootState = ReturnType<typeof rootReducer>