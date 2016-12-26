

import Vue from 'vue'
import App from './App'
import VueRouter from 'vue-router'

Vue.use(VueRouter);


new Vue({
  el: '#app',
  template: '<App/>',
  components: { App }
});
