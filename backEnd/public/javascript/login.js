var found = $('#found') || {};
var registrar = $('#registrar') || {};
var foundPhone = $('#foundPhone') || {};

var noticeTpl = $('.noticeTpl') || [];

var getCode = $('#getCode') || {};

var registrarTpl = $('#registrarTpl') || {};
var forgetTpl = $('#forgetTpl') || {};
var logTpl = $('#logTpl') || {};

var normalWindow = $('.normal_window') || [];

/**
 * @description 处理路由刷新
 */
(function (window) {
    window ? window.location.href.indexOf('#') !== -1 ? window.location.href = window.location.href.split('#')[0] : null : null;

})(window);


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
    var phone = document.getElementsByName('phone') ? (document.getElementsByName('phone')[0] ?
        document.getElementsByName('phone')[0].val() : 0) : 0;
    phone = parseInt(phone);
    var notice = $($('.noticetpl').eq(1));
    if(!verifyPhone(phone)){

        notice.html('手机号格式有误!').show();
        var phoneTime = setTimeout(function () {
            notice.hide().html('');
            clearTimeout(phoneTime);
        }, 2000);
        e.preventDefault();
        return;
    }
    var firstPd = $('#firstPd') ? $('#firstPd').val() : 0;
    var confirmPd = $('#confirmPd') ? $('#confirmPd').val() : 0;


    if(firstPd !== confirmPd){
        notice.html('密码不一致!').show();
        var pdTime = setTimeout(function () {
            notice.hide().html('');
            clearTimeout(pdTime);
        }, 2000);
        e.preventDefault();
    }
});

getCode.bind('click', function (e) {

    e.preventDefault();
    var notice = $(noticeTpl.eq(2));

    if(!(foundPhone && verifyPhone(foundPhone.val()))){
        notice.html('手机号格式有误').show();
        var pdTime = setTimeout(function () {
            notice.hide().html('');
            clearTimeout(pdTime);
        }, 2000);
        return;
    }
    $.post('/getCode', {phone:foundPhone.val()}, function (response) {
    });

    var count = 1;
    var target = $(e.target);

    target.attr('disabled', 'disabled');
    var timer = setInterval(function () {
        count += 1;
        if(count === 30){
            clearInterval(timer);
            console.log('ok');
            target.html('获取验证码');
            target.removeAttr('disabled');
        }
        target.html(30 - count + 's');
    }, 1000);
});





