$(function () {
    // 开发环境URL：
    let baseURL = "http://api-breakingnews-web.itheima.net";

    $.ajaxPrefilter(function (options) {
        options.url = baseURL + options.url;

        // 如果是 /my/ 开头的，要加上 Authorization
        if (options.url.indexOf('/my/') != -1) {
            options.headers = {
                Authorization: localStorage.getItem('token') || '',
            },

                // 登录拦截
                options.complete = function (res) {
                    // console.log(res.responseJSON);
                    let obj = res.responseJSON;
                    // 判断：如果 status 等于 1 且 message 
                    if (obj.status == 1 && obj.message === "身份认证失败！") {
                        // 清空本地token
                        localStorage.removeItem('token');
                        // 跳转到 login.html
                        location.href = '/login.html';
                    }
                }
        }
    });
})
