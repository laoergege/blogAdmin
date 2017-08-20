// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import 'muse-components/styles/base.less' // 加载基础的样式
import './style.css' // 导入全局样式

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
