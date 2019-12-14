import React, {useState, useEffect} from "react";
import { connect } from "react-redux";
import { getHomeList } from "../store/modules/home.js";

function Index(props) {
  const [count, setCount] = useState(1)
  useEffect(()=>{
    if(!props.list.length){
      props.getHomeList()
    }
  },[])
  return (
    <div>
      <h1>hello {props.targ} !</h1>
      <div>{count}</div>
      <button onClick={()=>setCount(count+1)}>增加</button>
      <hr/>
      <ul>
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
)(Index)