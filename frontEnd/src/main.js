

import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App'

Vue.use(VueRouter);


const store = new Vuex.Store({
  state : {
    infoBarDisplay : 'none'
  },
  mutations : {
    showInfoBar (state) {
      state.infoBarDisplay = 'block';
    },
    hideInfoBar (state) {
      state.infoBarDisplay = 'none';
    }
  }
});



new Vue({

  el: '#app',
  template: '<App/>',
  components: { App },
});

