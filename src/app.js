import React from "react";
import Index from "./views/index.js"
import Login from "./views/login.js"
import About from "./views/about.js"
import User from "./views/user.js"
import Error404 from "./views/error404.js";
import "./app.css";

export default [
  {
    path: '/',
    component: Index,
    exact: true,
    key: 'index'
  },
  {
    path: '/login',
    component: Login,
    exact: true,
    key: 'login'
  },
  {
    path: '/user',
    component: User,
    exact: true,
    key: 'user'
  },
  {
    path: '/about',
    component: About,
    exact: true,
    key: 'about'
  },
  {
    component: Error404,
    key: 'error404'
  }
]