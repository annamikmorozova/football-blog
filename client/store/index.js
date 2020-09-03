import {createStore, combineReducers, applyMiddleware} from "redux";
import {createLogger} from "redux-logger";
import thunkMiddleware from "redux-thunk";
import {composeWithDevTools} from "redux-devtools-extension";
import user from "./user";
import post from "./post";
import allUsers from "./allUsers.js";

const reducer = combineReducers({user, post, allUsers});
const middleware = composeWithDevTools(
	applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
);
const store = createStore(reducer, middleware);

export default store;
export * from "./user";
export * from "./post";
export * from "./allUsers";
