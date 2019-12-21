//首页逻辑

const GET_LIST = "HOME/GET_LIST"

export const getHomeList = server => {
  return (dispatch, getState, axiosInstance) => {
    return axiosInstance.get("/course/list").then(res=>{
      dispatch({
        type: GET_LIST,
        list: res.data.list
      })
    })
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