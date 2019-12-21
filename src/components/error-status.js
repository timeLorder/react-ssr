import React from "react";
import { Route } from "react-router-dom";

function ErrorStatus({code, children}) {
  return <Route render={({staticContext})=>{
    if(staticContext) {
      staticContext.statusCode = code
    }
    return children
  }}></Route>
}

export default ErrorStatus