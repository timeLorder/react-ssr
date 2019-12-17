//User逻辑

const GET_USERINFO = "USER/GET_USERINFO"

export const getUserinfo = server => {
  return (dispatch, getState, axiosInstance) => {
    return axiosInstance.get("/api/user/info").then(res=>{
      dispatch({
        type: GET_USERINFO,
        info: res.data.data
      })
    })
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