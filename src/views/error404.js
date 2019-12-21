import React from "react";
import ErrorStatus from "../components/error-status";

function Error404(props) {
  return (
    <ErrorStatus code={404}>
      <h1>非礼勿视！</h1>
      <img id="img-404" src="/404.gif" alt="" />
    </ErrorStatus>
  )
}

export default Error404