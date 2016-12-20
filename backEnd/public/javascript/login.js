var found = document.querySelector('#found') || {};

var registrarTpl = document.querySelector('#registrarTpl') || {};
var forgetTpl = document.querySelector('#forgetTpl') || {};
var logTpl = document.querySelector('#logTpl') || {};

var normalWindow = document.getElementsByClassName('normal_window') || [];

function hideNormal () {
    for(var i = 0; i < normalWindow.length; i++){
        normalWindow[i].style.display = 'none';
    }
}

function showRegistrar () {
    hideNormal();
    registrarTpl.classList.add('showWindow');
    registrarTpl.style.display = 'block';
}

function showForget () {
    hideNormal();
    forgetTpl.classList.add('showWindow');
    forgetTpl.style.display = 'block';
}

function showLog () {
    hideNormal();
    logTpl.classList.add('showWindow');
    logTpl.style.display = 'block';
}



window.addEventListener('hashchange', function (e) {
    var newURL = e.newURL;
    var search = newURL.split('#');
    if(search.length === 1){
        showLog();
    }else {
        if(search[1] === 'registrar'){
            showRegistrar();
        }else if(search[1] === 'forget'){
            showForget();
        }
    }
});

found.addEventListener('click', function () {
    var phone = document.getElementsByName('phone');
});


