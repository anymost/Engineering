var newCount = document.querySelector('#newCount');
var newCountTpl = document.querySelector('#newCountTpl');
var forget = document.querySelector('#forget');
var forgetTpl = document.querySelector('#forgetTpl');

var normalWindow = document.getElementsByClassName('normal_window');

function hideNormal () {
    for (var i = 0; i < normalWindow.length; i++) {
        normalWindow[i].style.display = 'none';
    }
}
newCount.addEventListener('click', function (e) {
    hideNormal();

});