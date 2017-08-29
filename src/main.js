// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'

import router from './router' // 导入 vue-router

import 'muse-components/styles/base.less' // 加载基础的样式
import './style.css' // 导入全局样式
import "github-markdown-css/github-markdown.css"  // 导入 markdown 主题

// import "jquery";  // 导入 jq
// import "./util/insertAtCursor.extend"; // 导入 TextArea在光标处插入文本 扩展功能

import { registerComps } from './muse-components'; //导入 muse-ui 组件 
registerComps(Vue); // 注册 muse-ui 组件

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
