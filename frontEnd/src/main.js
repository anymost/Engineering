import Vue from 'vue'

import router from './router'
import App from './App'
import {getUserInfo, createSocket} from './tools'
import store from './store'

let heartbeat = null;


new Vue({

  el: '#app',
  template: '<App/>',
  components: {App},
  router,
  mounted () {

    const userId = getUserInfo().userId;
    const socket = createSocket();
    window.addEventListener('load', function(){

      socket.emit('clearMessage', {userId:userId});
    });
    window.addEventListener('reload', function(){
      socket.emit('clearMessage', {userId:userId});
    });

    heartbeat = setInterval(function () {
      socket.emit('heartbeat', {userId: userId});
    }, 1000*60*2);


    socket.on('pushMessage', function (message) {

      socket.emit('confirmPushMessage', {
        result: 0,
        userId: userId
      });
      if (message) {
        store.commit('receiveMessage', message);
      }
    });


  },

  destroyed () {
    if (heartbeat) {
      clearInterval(heartbeat);
      heartbeat = null;
    }
  }
});

