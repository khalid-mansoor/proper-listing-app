import { applyMiddleware, compose, createStore } from "redux";
import { appReducer } from "./reducers";
import thunk from "redux-thunk";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
let store = createStore(appReducer, composeEnhancers(applyMiddleware(thunk)));

export default store;
