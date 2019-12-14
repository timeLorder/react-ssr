import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import homeReducer from "./modules/home";
import userReducer from "./modules/user";

const reducers = combineReducers({
  home: homeReducer,
  user: userReducer
})

export const getServerStore = () => {
  return createStore(reducers, applyMiddleware(thunk))
}

export const getClientStore = () => {
  const defaultState = window.__context ? window.__context : {}
  return createStore(reducers, defaultState, applyMiddleware(thunk))
}