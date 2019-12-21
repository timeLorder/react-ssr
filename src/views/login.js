import React from "react";
import { connect } from "react-redux";
import { userLogin } from "../store/modules/user.js";

function Login(props) {
  function handleClick() {
    props.userLogin({}).then(()=>{
      props.history.push('/user')
    })
  }
  return (
    <div>
      <button onClick={handleClick}>登录</button>
    </div>
  )
}

export default connect(
  ()=>({}),
  {userLogin}
)(Login)