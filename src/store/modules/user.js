import cookie from "../../utils/cookie.js";
import commons from "../../utils/commons.js";

//User逻辑

const USER_LOGIN = "USER/LOGIN"
const GET_USERINFO = "USER/GET_USERINFO"

export const userLogin = loginForm => {
  return (dispatch, getState, axiosInstance) => {
    return axiosInstance.post("/visitor/login", loginForm).then(res=>{
      cookie.setCookies(commons.tokenName, res.data.data.token)
      dispatch({
        type: USER_LOGIN,
        token: res.data.data.token
      })
    })
  }
}

export const getUserinfo = token => {
  return (dispatch, getState, axiosInstance) => {
    return axiosInstance.request(Object.assign({
      url: "/user/info"
    }, token ? {
      headers: {
        [commons.tokenName]: token
      }
    } : {})).then(res=>{
      dispatch({
        type: GET_USERINFO,
        info: res.data.data
      })
    })
  }
}

const defaultState = {
  token: '',
  userinfo: {}
}

function UserReducer(state=defaultState, action) {
  switch (action.type) {
    case 'set-token':
      return {
        ...state,
        token: action.token
      }
      break;
    case 'logout-reset':
        return {
          token: '',
          userinfo: {}
        }
        break;
    case USER_LOGIN:
      return {
        ...state,
        token: action.token
      }
      break;
    case GET_USERINFO:
      return {
        ...state,
        userinfo: action.info
      }
      break;
    default:
      return state
  }
}

export default UserReducer