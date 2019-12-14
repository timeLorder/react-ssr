//首页逻辑
import axios from "axios";

const GET_LIST = "HOME/GET_LIST"

export const getHomeList = server => {
  return (dispatch, getState, axiosInstance) => {
    return axios.get("http://localhost:9090/api/course/list").then(res=>{
      dispatch({
        type: GET_LIST,
        list: res.data.list
      })
    }).catch(error=>{}) //在这里捕获接口报错以保证server里的Promise.all一定会走到then里面
  }
}

const defaultState = {
  list: []
}

function HomeReducer(state=defaultState, action) {
  switch (action.type) {
    case GET_LIST:
      return {
        ...state,
        list: action.list
      }
      break;
    default:
      return state
  }
}

export default HomeReducer