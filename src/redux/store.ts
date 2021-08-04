import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import rootReducer from "./Reducers/rootReducer";
import { getFirebase } from "react-redux-firebase";
import fbconfig from "../Utils/fb.config";

const initialState = {};

const middleware = [thunk.withExtraArgument({ getFirebase })];

const store = createStore(
    rootReducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
);

export const rrfProps = {
    firebase: fbconfig,
    config: {},
    dispatch: store.dispatch,
};

export default store;
