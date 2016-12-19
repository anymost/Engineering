/**
 * Created by bradyzhang on 2016/12/15.
 * 一些工具函数
 */

/**
 * 生成随机数充当ID
 * @returns {number}
 */
var getRandom = function () {
    return  parseInt(('' + Math.random()).slice(2, 5) + Date.now());
};

exports.getRandom = getRandom;
/**
 * @description 过滤非法字符
 * @param str
 * @returns {string}
 */
var filterString = function (str) {
    if(!str)
        return '';
    var pattern = new RegExp("[`~!@#$^&*()=|{}':;',\\[\\].<>/?~！@#￥……&*（）——|{}【】‘；：”“'。，、？%+_]");
    var specialStr = "";
    for(var i=0;i<str.length;i++)
    {
        specialStr += str.substr(i, 1).replace(pattern, '');
    }
    return specialStr;
};

exports.filterString = filterString;






