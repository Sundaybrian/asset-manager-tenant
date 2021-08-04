import { combineReducers } from "redux";
import auth from "./authReducer";
import ui from "./uiReducer";
import { firebaseReducer } from "react-redux-firebase";

export default combineReducers({
    auth,
    ui,
    firebase: firebaseReducer
});
