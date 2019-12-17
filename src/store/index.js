import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import homeReducer from "./modules/home";
import userReducer from "./modules/user";
import axios from "axios";

const reducers = combineReducers({
  home: homeReducer,
  user: userReducer
})

const serverAxios = axios.create({
  baseURL: 'http://localhost:9090'
})

const clientAxios = axios.create({
  // 当前路径的 node 服务
  baseURL: '/'
})

export const getServerStore = () => {
  return createStore(reducers, applyMiddleware(thunk.withExtraArgument(serverAxios)))
}

export const getClientStore = () => {
  const defaultState = window.__context ? window.__context : {}
  return createStore(reducers, defaultState, applyMiddleware(thunk.withExtraArgument(clientAxios)))
}