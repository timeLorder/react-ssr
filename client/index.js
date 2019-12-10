import React from "react";
import ReactDom from "react-dom";

import App from "../src/app.js"

ReactDom.hydrate(App, document.getElementById('root'))