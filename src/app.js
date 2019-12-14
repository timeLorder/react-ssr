import React from "react";
import Index from "./views/index.js"
import About from "./views/about.js"
import User from "./views/user.js"

export default [
  {
    path: '/',
    component: Index,
    // exact: true,
    key: 'index'
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
  }
]