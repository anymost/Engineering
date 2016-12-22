/**
 * Module dependencies.
 */

var TopClient = require('./topClient').TopClient;

var client = new TopClient({
                            'appkey':'23377505',
                            'appsecret':'769d16d460b3ebb74ec00bbe6b5a46e7',
                            'REST_URL':'http://api.daily.taobao.net/router/rest'});

/**
 * @description 用于发送验证
 * @param phone
 * @param callback
 */
function sendCode (phone, code, callback) {
    client.execute('alibaba.aliqin.fc.sms.num.send',
        {
            'sms_type': 'normal',
            'sms_free_sign_name': '来自WeWork',
            'sms_param': {code: code},
            'rec_num': ''+phone,
            'sms_template_code': 'SMS_35035613'
        },
        function (error, response) {
            if (!error) {
                callback({
                    result: 0,
                    data: response
                });
            }
            else{
                callback({
                    result : -1,
                    data : error
                });
            }

        })
}

exports.sendCode = sendCode;