//User逻辑
import axios from "axios";

const GET_USERINFO = "USER/GET_USERINFO"

export const getUserinfo = server => {
  return (dispatch, getState, axiosInstance) => {
    return axios.get("http://localhost:9093/api/user/info").then(res=>{
      dispatch({
        type: GET_USERINFO,
        info: res.data.data
      })
    }).catch(error=>{}) //在这里捕获接口报错以保证server里的Promise.all一定会走到then里面
  }
}

const defaultState = {
  userinfo: {}
}

function UserReducer(state=defaultState, action) {
  switch (action.type) {
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