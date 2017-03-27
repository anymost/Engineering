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
  return 'http://localhost:3000/'+path.split('%2F').join('/');
};

export let networkGET = function (target,path){
  return target.$http.get('http://localhost:3000/'+path)
};

export let networkPost = function (target, path, data) {
  return target.$http.post('http://localhost:3000/'+path,data)
};


