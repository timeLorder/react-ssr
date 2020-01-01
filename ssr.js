//通过爬虫实现ssr
const express = require("express")
const puppeteer = require("puppeteer")
const commons = require("./src/utils/commons.js")
const Proxy = require("http-proxy-middleware")

const app = express()
const cacheUrl = {}
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

//设置静态资源目录
app.use(express.static('public'))

app.use(commons.apiPrev, proxy)

app.get('*', async (req, res)=>{
  if(cacheUrl[req.url]) {
    return res.send(cacheUrl[req.url])
  }
  const browser = await puppeteer.launch()
  const page = await browser.newPage()
  await page.goto('http://localhost:9093'+req.url, {
    waitUntil: ['networkidle0']
  })
  const html = await page.content()
  cacheUrl[req.url] = html
  res.send(html)
})

app.listen(8081, ()=>{
  console.log('spider ssr start')
})