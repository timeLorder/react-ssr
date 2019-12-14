import React, {useEffect} from "react";
import { connect } from "react-redux";
import { getUserinfo } from "../store/modules/user.js";

function User(props) {
  useEffect(()=>{
    if(!props.username && !props.best){
      props.getUserinfo()
    }
  },[])
  return (
    <div>
      <h1>
        在{props.username}中最棒的是{props.best}
      </h1>
    </div>
  )
}

User.loadData = store => {
  return store.dispatch(getUserinfo())
}

export default connect(
  state => ({
    username: state.user.userinfo.name,
    best: state.user.userinfo.best
  }),
  {getUserinfo}
)(User)