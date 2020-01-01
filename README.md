# react-ssr


> 开课吧 react-ssr 训练营 总结



#### SSR和CSR

- SSR（Server Side Render），顾名思义即服务端渲染好首屏html后再返回给客户端。

- CSR（Client Side Render），即一般情况下`Js`在浏览器中运行渲染出内容。



#### 同构

即同时具备SSR和CSR能力。利用SSR渲染首屏内容，然后客户端通过hydrate接管之后的逻辑（CSR）。



#### 具体到本次基于React的同构项目

![](F:\SelfLearning\前端\Web全栈\训练营\同构.png)

###### 基础，Component支持

- Server端和Client端各一个webpack配置，打出两个不同的包，其中Server端配置了`webpack-node-externals`，避免将node_modules中需要的依赖放进打包文件中，[而是在运行时从外部获取](https://webpack.docschina.org/configuration/externals/#externals)，Server端的包会通过start指令一直运行在服务器上。
- Server端通过express监听访问，然后使用`react-dom`的`renderToString`方法将访问的首屏组件渲染成html字符串，并将其拼接在一个完整的html字符串中返回给用户。
- Client端通过`react-dom`的`hydrate`方法对Server端通过`renderToString`生成的html补充`Js`交互逻辑。同时需要在Server端返回的首屏html中添加一个引用Client包的script标签。

###### Router支持

- Server端使用`react-router-dom`的`StaticRouter`。
- Client端使用`react-router-dom`的`BrowserRouter`。

###### Store支持

- Server端和Client端需要分别初始化两个Store。

- Server端需要改造express中的逻辑。在根据请求路径渲染对应首屏组件之前，先要遍历请求路由中匹配到的所有组件，需要异步请求数据的在server端发起请求，获取数据，更新store，然后利用`Promises.all`在所有请求结束后再调用`renderToString`，返回对应首屏html。并且把初始的Store状态存在window.__context中以便Client使用。
- Client端直接使用Server端存在window.__context中的状态来初始化store。在组件的componentDidMount或useEffect中，根据是否已经在Server端进行过初始化来决定是否需要在Client端调用接口获取数据。



#### 作业引申

1. 如何避免Server端`api`接口报错后不走`Promises.all`的then函数导致界面为空？

   答：~~在每个`api`请求处都加上catch方法捕获报错，以保证server里的Promise.all一定会走到then里面。这一步应该可以通过进一步封装axios，针对接口404等错误进行处理，来避免在每个接口调用处都需要加catch。不过这种封装似乎不能保证，接口不报错的情况下，在之后then函数中代码报错导致的相同问题。~~对Promise.all要处理的数组先进行遍历，对每个promise都进行catch处理即可。

2. 如何在Server端代理客户端的`api`请求，这样就不需要在后端提供跨域支持了？

   答：先将`api`请求统一发往Server端，在Server端使用express中间件`http-proxy-middleware`来进行代理。