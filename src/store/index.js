import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import homeReducer from "./modules/home";
import userReducer from "./modules/user";
import {createAxios} from "../api";

const reducers = combineReducers({
  home: homeReducer,
  user: userReducer
})

const serverAxios = createAxios({ type: 'server' })

const clientAxios = createAxios({ type: 'client' })

export const getServerStore = () => {
  return createStore(reducers, applyMiddleware(thunk.withExtraArgument(serverAxios)))
}

export const getClientStore = () => {
  const defaultState = window.__context ? window.__context : {}
  return createStore(reducers, defaultState, applyMiddleware(thunk.withExtraArgument(clientAxios)))
}