import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import cookie from "../utils/cookie.js";
import commons from "../utils/commons.js";

function Header(props) {
  function logout() {
    props.clearTokenAndUserinfo()
    cookie.delCookies(commons.tokenName)
  }
  return (
    <div>
      <Link to="/">首页</Link>&nbsp;|&nbsp;
      <Link to="/about">关于</Link>&nbsp;|&nbsp;
      <Link to="/user">用户</Link>&nbsp;|&nbsp;
      <Link to="/error404">404页面</Link>&nbsp;|&nbsp;
      <button onClick={logout}>推出登录</button>
    </div>
  )
}

export default connect(
  ()=>({}),
  {clearTokenAndUserinfo: ()=>({
    type: 'logout-reset'
  })}
)(Header)