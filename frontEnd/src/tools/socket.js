/**
 * Created by lenovo on 2017/4/12.
 */

import io from 'socket.io-client'

export const getUserInfo = function () {
  let cookie = document.cookie.split(';');
  let userInfo = {};
  cookie.forEach(function (item) {
    item = item.split('=');
    userInfo[String.trim(item[0])] = item[1];
  });
  return userInfo;
};
export const createSocket =  function () {
  return io('http://localhost:3000');

};
