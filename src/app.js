import React, {useState} from "react";

function App(props) {
  const [count, setCount] = useState(1)
  return (
    <div>
      <h1>hello {props.targ} !</h1>
      <div>{count}</div>
      <button onClick={()=>setCount(count+1)}>增加</button>
    </div>
  )
}

export default <App targ="timeLorder"></App>