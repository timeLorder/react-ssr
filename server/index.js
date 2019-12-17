import React from "react";
import express from "express";
import routes from "../src/app.js";
import Proxy from "http-proxy-middleware";
import Header from "../src/components/header.js";
import { Provider } from "react-redux";
import { StaticRouter, matchPath, Route } from "react-router-dom";
import { renderToString } from "react-dom/server";
import { getServerStore } from "../src/store/index.js";

const store = getServerStore()
const app = express()

//设置http-proxy-middleware配置参数
const proxy = Proxy({
  target: "http://localhost:9090",
  changeOrigin: true,
  onError: function (err, req, res) {
    // 监听proxy的onerr事件
    res.writeHead(500, {
      'Content-Type': 'text/plain'
    });
   
    res.end('Something went wrong. And we are reporting a custom error message.');
  }
})

/**
 * 处理所有的网络请求，捕捉错误，避免promise.all 的时候出错就 catch
 * @param {array} promises 网络请求列表
 */
const handlePromises = (promises) => {
  return promises.map(promise =>
    promise.then(res => {
      return { ok: true, data: res }
    }).catch(err => {
      return { ok: false, data: err }
    })
  )
}

//设置静态资源目录
app.use(express.static('public'))

//server代理api接口请求
app.use('/api', proxy)

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

  Promise.all(handlePromises(promises)).then((posts)=>{
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
  }).catch(() => {
    res.send('500 Server Internal Error')
  })
})

app.listen(9093, ()=>{
  console.log('开始监听')
})