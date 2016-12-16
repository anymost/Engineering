/**
 * Created by bradyzhang on 2016/12/15.
 * 一些工具函数
 */

/**
 * 生成随机数充当ID
 * @returns {number}
 */
function getRandom () {
    return  parseInt(('' + Math.random()).slice(2, 5) + Date.now());
}


module.exports = {
    getRandom : getRandom
};


