

import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App'

Vue.use(VueRouter);

const router = new VueRouter([
    { path : '/one',
      component : {
        template : '<div>I am ONE</div>'
      }
    },
    {
      path : '/two',
      component : {
        template : '<div>I am TWO</div>'
      }
    }
]);



new Vue({

  el: '#app',
  template: '<App/>',
  components: { App },
  router
});

