import  Vue from 'vue'
import VueResource from 'vue-resource'
import io from 'socket.io-client'


Vue.use(VueResource);

export let getUserInfo = function () {
  let cookie = document.cookie.split(';');
  let userInfo = {};
  cookie.forEach(function (item) {
      item = item.split('=');
      userInfo[String.trim(item[0])] = item[1];
  });
  return userInfo;
};

export let handlePicPath = function (path) {
  return '//localhost:3000/'+path.split('%2F').join('/');
};

export let networkGET = function (path){
  return Vue.http.get('//localhost:3000'+path)
};

export let networkPost = function (path, data) {
  return Vue.http.post('//localhost:3000'+path,data)
};
export const createSocket =  function () {
  return io('//localhost:3000');

};



