

import Vue from 'vue'

import router from './router'
import App from './App'
import tools from './tools'



let heartbeat = null;
new Vue({

  el: '#app',
  data (){
    return {
      heartbeat : null,
      userId : tools.getUserInfo().userId,
      socket : tools.createSocket()
    }
  },
  template: '<App/>',
  components: { App },
  router,
  mounted () {

    this.heartbeat = setTimeout(function(){

      this.socket.emit('heartbeat',{usrId:this.userId});

    },1000*60*2)
  },

  destroyed () {
    if(this.heartbeat) {
      clearTimeout(this.heartbeat);
      this.heartbeat = null;
    }
  }
});

