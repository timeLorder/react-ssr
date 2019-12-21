import fs from "fs";
import path from "path"
import React from "react";
import express from "express";
import routes from "../src/app.js";
import commons from "../src/utils/commons.js";
import Proxy from "http-proxy-middleware";
import cookieParase from "cookie-parser"
import Header from "../src/components/header.js";
import StyleContext from 'isomorphic-style-loader/StyleContext'
import { Provider } from "react-redux";
import { StaticRouter, matchPath, Route, Switch } from "react-router-dom";
import { renderToString } from "react-dom/server";
import { getServerStore } from "../src/store/index.js";

const store = getServerStore()
const app = express()

//设置http-proxy-middleware配置参数
const proxy = Proxy({
  target: commons.apiServer,
  changeOrigin: true,
  pathRewrite: {
    ['^'+commons.apiPrev]: ''
  },
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

function csrRender(res) {
  const filename = path.resolve(process.cwd(), 'public/index.csr.html')
  const html = fs.readFileSync(filename, 'utf-8')
  return res.send(html)
}

//设置静态资源目录
app.use(express.static('public'))

//server代理api接口请求
app.use(commons.apiPrev, proxy)

//这点很重要 如果没有 下面的req.cookies会返回undefined
app.use(cookieParase())

app.get('*', (req, res)=>{
  //以路由参数判断是否放弃SSR使用CSR
  if(req.query._mode==='csr'){
    return csrRender(res)
  }

  //判断是否有token 有的话用它初始化store里的token
  let token
  if(req.cookies) {
    token = req.cookies[commons.tokenName]
  }
  if(token) {
    store.dispatch({
      type: 'set-token',
      token
    })
  }
  
  const promises = []
  routes.forEach(route=>{
    const match = matchPath(req.path, route)
    if(match){
      const { loadData } = route.component
      //改造需要登录的页面的loadData方法把token传递给axios实例
      loadData && promises.push(loadData(store, token))
    }
    //老师用的routes.some然后没有return match, 似乎等价于使用routes.foreach
    // return match
  })

  Promise.all(handlePromises(promises)).then((posts)=>{
    const context = {}
    const css = new Set() // CSS for all rendered React components
    const insertCss = (...styles) => styles.forEach(style => css.add(style._getCss()))
    
    const content = renderToString(
      <StyleContext.Provider value={{ insertCss }}>
        <Provider store={store}>
          <StaticRouter location={req.url} context={context}>
            <Header/>
            <Switch>
              {routes.map(route => <Route {...route}></Route>)}
            </Switch>
          </StaticRouter>
        </Provider>
      </StyleContext.Provider>
    )

    if(context.statusCode) {
      res.status(context.statusCode)
    }

    if(context.action==='REPLACE') {
      res.redirect(301, context.url)
    } else {
      //不放在else里会报UnhandledPromiseCatch
      res.send(`
        <html>
          <head>
            <meta charset="utf-8"/>
            <title>${commons.title}</title>
            <style>${[...css].join('')}</style>
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
    }
  }).catch(() => {
    res.send('500 Server Internal Error')
  })
})

app.listen(9093, ()=>{
  console.log('开始监听')
})