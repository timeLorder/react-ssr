import axios from "axios";
import cookie from "../utils/cookie.js"
import commons from "../utils/commons.js";

export function createAxios({type}) {
  const isServer = type === 'server'

  const instance = axios.create({
    baseURL: isServer ? commons.apiServer : commons.apiPrev
  });

  instance.interceptors.request.use((config) => {
    if(!isServer){
      //Client端的请求统一在headers带上token
      const token = cookie.getCookies(commons.tokenName)
      if (token) {
        config.headers[commons.tokenName] = token;
      }
    }
    return config;
  }, (error) => {
    return Promise.reject(error);
  });

  return instance
}
