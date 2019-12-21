import React, {useState, useEffect} from "react";
import { connect } from "react-redux";
import { getHomeList } from "../store/modules/home.js";
import commons from "../utils/commons.js";
import styles from "../styles/index.css";
import withStyles from "isomorphic-style-loader/withStyles";

function Index(props) {
  const [count, setCount] = useState(1)
  useEffect(()=>{
    if(!props.list.length){
      props.getHomeList()
    }
  },[])
  return (
    <div>
      <h1>Welcome to {commons.title} !</h1>
      <div>{count}</div>
      <button onClick={()=>setCount(count+1)}>增加</button>
      <hr/>
      <ul className={styles.courselist}>
        {props.list.map(v=>{
          return <li key={v.id}>{v.name}</li>
        })}
      </ul>
    </div>
  )
}

Index.loadData = store => {
  return store.dispatch(getHomeList())
}

export default connect(
  state => ({list: state.home.list}),
  {getHomeList}
)(withStyles(styles)(Index))