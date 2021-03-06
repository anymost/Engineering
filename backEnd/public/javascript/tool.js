/**
 * Created by bradyzhang on 2016/12/20.
 */
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


/**
 * @description 验证手机号
 * @param phone
 * @returns {boolean}
 */

var verifyPhone = function (phone) {
    return !!(/^1[34578]\d{9}$/.test(phone));
};


/**
 * @description 验证邮箱
 * @param email
 * @returns {boolean}
 */
var verifyEmail = function (email) {
    return !!(/^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(email));
};




