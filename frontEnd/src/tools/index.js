export let getUserId = function () {
  const userId = document.cookie.split(';')[0].split('=')[1];
  return userId;
};

export let networkGET = function (target,path){
  return target.$http.get('http://localhost:3000/'+path)
};

export let networkPost = function (target, path, data) {
  return target.$http.post('http://localhost:3000/'+path,data)
};


