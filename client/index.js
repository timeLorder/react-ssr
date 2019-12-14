import React from "react";
import ReactDom from "react-dom";
import routes from "../src/app.js";
import Header from "../src/components/header.js";
import { Provider } from "react-redux";
import { BrowserRouter, Route } from "react-router-dom";
import { getClientStore } from "../src/store/index.js";

const Page = (
  <Provider store={getClientStore()}>
    <BrowserRouter>
      <Header/>
      {routes.map(route => <Route {...route}></Route>)}
    </BrowserRouter>
  </Provider>
)

ReactDom.hydrate(Page, document.getElementById('root'))