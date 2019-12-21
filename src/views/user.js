import React, {useEffect} from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { getUserinfo } from "../store/modules/user.js";
import styles from "../styles/user.css";
import withStyles from "isomorphic-style-loader/withStyles";

function User(props) {
  useEffect(()=>{
    if(props.isLogin && !props.username && !props.best){
      props.getUserinfo()
    }
  },[])
  return props.isLogin ? (
    <div>
      <h1>
        在<span className={styles.username}>{props.username}</span>中最棒的是{props.best}
      </h1>
    </div>
  ) : (
    <Redirect to="/login"></Redirect>
  )
}

User.loadData = (store, token) => {
  if(token) {
    return store.dispatch(getUserinfo(token))
  } else {
    return Promise.reject('noLogin')
  }
}

export default connect(
  state => ({
    isLogin: !!state.user.token,
    username: state.user.userinfo.name,
    best: state.user.userinfo.best
  }),
  {getUserinfo}
)(withStyles(styles)(User))