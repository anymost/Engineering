var found = $('#found') || {};
var registrar = $('#registrar') || {};

var registrarNotice = $('#registrarNotice') || {};

var getCode = $('#getCode') || {};

var registrarTpl = $('#registrarTpl') || {};
var forgetTpl = $('#forgetTpl') || {};
var logTpl = $('#logTpl') || {};

var normalWindow = $('.normal_window') || [];

function hideNormal () {
    for(var i = 0; i < normalWindow.length; i++){
        normalWindow.eq(i).hide();
    }
}

function showRegistrar () {
    hideNormal();
    registrarTpl.addClass('showWindow');
    registrarTpl.show();
}

function showForget () {
    hideNormal();
    forgetTpl.addClass('showWindow');
    forgetTpl.show();
}

function showLog () {
    hideNormal();
    logTpl.addClass('showWindow');
    logTpl.show();
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

registrar.bind('click', function (e) {
    var phone = document.getElementsByName('phone')?(document.getElementsByName('phone')[0]?
        document.getElementsByName('phone')[0].val():0):0;
    phone = parseInt(phone);
    if(!verifyPhone(phone)){

        registrarNotice.html('手机号格式有误!');
        registrarNotice.show();
        var phoneTime = setTimeout(function () {
            registrarNotice.hide();
            registrarNotice.html('');
            clearTimeout(phoneTime);
        }, 2000);
        e.preventDefault();
        return;
    }
    var firstPd = $('#firstPd') ? $('#firstPd').val() : 0;
    var confirmPd = $('#confirmPd') ? $('#confirmPd').val() : 0;


    if(firstPd !== confirmPd){
        registrarNotice.html('密码不一致!');
        registrarNotice.show();
        var pdTime = setTimeout(function () {
            registrarNotice.hide();
            registrarNotice.html('');
            clearTimeout(pdTime);
        }, 2000);
        e.preventDefault();
    }
});

getCode.bind('click', function (e) {
    e.preventDefault();
    var count = 1;
    var target = $(e.target);
    target.attr('disabled', 'disabled');
    var timer = setInterval(function () {
        count += 1;
        if(count === 30){
            clearInterval(timer);
            target.html('获取验证码');
            target.removeAttr('disabled');
        }
        target.html(30 - count + 's');
    }, 1000);
});




