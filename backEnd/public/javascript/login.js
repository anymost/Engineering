var found = document.querySelector('#found') || {};
var registrar = document.querySelector('#registrar') || {};

var registrarNotice = document.querySelector('#registrarNotice') || {};


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

registrar.addEventListener('click', function (e) {
    var phone = document.getElementsByName('phone')?(document.getElementsByName('phone')[0]?
        document.getElementsByName('phone')[0].value:0):0;
    phone = parseInt(phone);
    if(!verifyPhone(phone)){

        registrarNotice.innerHTML = '手机号格式有误!';
        registrarNotice.style.display = 'block';
        var phoneTime = setTimeout(function () {
            registrarNotice.style.display = 'none';
            registrarNotice.innerHTML = '';
            clearTimeout(phoneTime);
        }, 2000);
        e.preventDefault();
        return;
    }
    var firstPd = document.querySelector('#firstPd')?document.querySelector('#firstPd').value:0;
    var confirmPd = document.querySelector('#confirmPd')?document.querySelector('#confirmPd').value:0;


    if(firstPd !== confirmPd){
        registrarNotice.innerHTML = '密码不一致!';
        registrarNotice.style.display = 'block';
        var pdTime = setTimeout(function () {
            registrarNotice.style.display = 'none';
            registrarNotice.innerHTML = '';
            clearTimeout(pdTime);
        }, 2000);
        e.preventDefault();
    }
});


