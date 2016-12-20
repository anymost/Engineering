var newCount = document.querySelector('#newCount');
var forget = document.querySelector('#forget');


var newCountTpl = document.querySelector('#newCountTpl');
var forgetTpl = document.querySelector('#forgetTpl');
var logTpl = document.querySelector('#logTpl');

var normalWindow = document.getElementsByClassName('normal_window');


newCount.addEventListener('click', function (e) {
    logTpl.classList.add('hideWindow');
    logTpl.style.display = 'none';
    setTimeout(function () {
        newCountTpl.style.display = 'block';
    },  1000);
});