$(function () {
    // 开发环境URL：
    let baseURL = "http://localhost:3005";

    $.ajaxPrefilter(function (options) {
        options.url = baseURL + options.url;
    });
})
