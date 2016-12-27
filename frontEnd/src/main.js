

import Vue from 'vue'
import VueRouter from 'vue-router'
import Vuex from 'vuex'
import App from './App'
import Hello from './components/Hello.vue'

Vue.use(VueRouter);
Vue.use(Vuex);

const store = new Vuex.Store({
  state : {
    infoBarDisplay : 'none'
  },
  mutations : {
    showInfoBar () {
      state.infoBarDisplay = 'block';
    },
    hideInfoBar () {
      state.infoBarDisplay = 'none';
    }
  }
});


const router = new VueRouter({
  routes:[{
    path: '/hello',
    component : Hello
  }]
});

new Vue({

  el: '#app',
  template: '<App/>',
  components: { App },
  store,
});
