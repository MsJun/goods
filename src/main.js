// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import './assets/css/index.css'
import axios from 'axios'
Vue.prototype.$http = axios
import VueLazyload from 'vue-lazyload'
Vue.use(VueLazyload, {
  loading: '/static/loading-svg/loading-bars.svg',
})
import {currency} from './util/currentcy'
Vue.filter("currency",currency);
import store from './store/index.js'
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})

