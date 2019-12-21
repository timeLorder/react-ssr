import React from "react";
import ReactDom from "react-dom";
import routes from "../src/app.js";
import Header from "../src/components/header.js";
import StyleContext from 'isomorphic-style-loader/StyleContext'
import { Provider } from "react-redux";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { getClientStore } from "../src/store/index.js";

const insertCss = (...styles) => {
  const removeCss = styles.map(style => style._insertCss())
  return () => removeCss.forEach(dispose => dispose())
}

const Page = (
  <StyleContext.Provider value={{ insertCss }}>
    <Provider store={getClientStore()}>
      <BrowserRouter>
        <Header/>
        <Switch>
          {routes.map(route => <Route {...route}></Route>)}
        </Switch>
      </BrowserRouter>
    </Provider>
  </StyleContext.Provider>
)

if(window.__context){
  ReactDom.hydrate(Page, document.getElementById('root'))
} else {
  ReactDom.render(Page, document.getElementById('root'))
}