import React from "react";
import express from "express";
import routes from "../src/app.js";
import Header from "../src/components/header.js";
import { Provider } from "react-redux";
import { StaticRouter, matchPath, Route } from "react-router-dom";
import { renderToString } from "react-dom/server";
import { getServerStore } from "../src/store/index.js";

const store = getServerStore()
const app = express()

app.use(express.static('public'))

app.get('*', (req, res)=>{

  const promises = []
  routes.forEach(route=>{
    const match = matchPath(req.path, route)
    if(match){
      const { loadData } = route.component
      loadData && promises.push(loadData(store))
    }
    //老师用的routes.some然后没有return match, 似乎等价于使用routes.foreach
    // return match
  })

  Promise.all(promises).then((posts)=>{
    // posts.forEach(p=>{
    //   console.log(p);
    // })
    const content = renderToString(
      <Provider store={store}>
        <StaticRouter location={req.url}>
          <Header/>
          {routes.map(route => <Route {...route}></Route>)}
        </StaticRouter>
      </Provider>
    )
    res.send(`
      <html>
        <head>
          <meta charset="utf-8"/>
          <title>react-ssr</title>
        </head>
        <body>
          <div id="root">${content}</div>
          <script>
            window.__context = ${JSON.stringify(store.getState())}
          </script>
          <script src="bundle.js"></script>
        </body>
      </html>
    `)
  })
})

app.listen(9093, ()=>{
  console.log('开始监听')
})