

import Vue from 'vue'

import router from './router'
import App from './App'
import {getUserInfo, createSocket} from './tools'
import store from './store'

let heartbeat = null;


new Vue({

  el: '#app',
  template: '<App/>',
  components: { App },
  router,
  mounted () {
    const userId = getUserInfo().userId;
    const socket = createSocket();
    heartbeat = setTimeout(function(){

      socket.emit('heartbeat',{usrId:userId});

    },1000*60*2);
    socket.on('PushMessage', function(message){
      socket.emit('confirmPushMessage',{
        result : 0,
        userId : userId
      });
      if(message){
        store.commit('receiveMessage', message);
      }
    })
  },

  destroyed () {
    if(heartbeat) {
      clearTimeout(heartbeat);
      heartbeat = null;
    }
  }
});

