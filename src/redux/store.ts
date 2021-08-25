import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import rootReducer from './Reducers/rootReducer';
import { getFirebase } from 'react-redux-firebase';

const initialState = {};

const middleware = [thunk.withExtraArgument({ getFirebase })];

const store = createStore(rootReducer, initialState, composeWithDevTools(applyMiddleware(...middleware)));

export default store;

// create your own dispatch function reference with custom typings
export const dispatchStore = store.dispatch as typeof store.dispatch | any;
