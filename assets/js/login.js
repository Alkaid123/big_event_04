$(function () {
    // 1、点击去注册账号，隐藏登录区域，显示注册区域
    $('#link_reg').on('click', function () {
        $('.login-box').hide();
        $('.reg-box').show();
    });

    // 2、点击去登录，显示登录区域，隐藏注册区域
    $('#link_login').on('click', function () {
        $('.login-box').show();
        $('.reg-box').hide();
    });

    // 自定义规则
    let form = layui.form;
    form.verify({
        pwd: [
            /^[\S]{6,16}$/
            , '密码必须6到16位，且不能出现空格'
        ],

        // 确认密码规则
        repwd: function (value) {
            let pwd = $('.reg-box input[name="password"]').val();
            // console.log(pwd);
            // 对比pwd 的密码 和 repwd是否相同，不相同则报错返回
            if (value != pwd) {
                return '两次输入的密码不一致！';
            }
        }
    });

    // 注册功能
    $('#form_reg').on('submit', function (e) {
        e.preventDefault();
        // 发送ajax请求
        $.ajax({
            url: '/api/reguser',
            type: 'POST',
            data: {
                username: $('.reg-box input[name="username"]').val(),
                password: $('.reg-box input[name="password"]').val(),
            },
            success: (res) => {
                console.log(res);
                // 错误
                if (res.status != 0) {
                    return layer.msg(res.msg, { icon: 5 });
                };

                // 成功 跳转到登录页面 
                layer.msg('恭喜您，注册成功', { icon: 6 });
                $('#link_login').click();
                // 将注册页面的内容清空
                $('#form_reg')[0].reset();
            }
        });
    });

    // 登录功能
    $('#form_login').on('submit', function (e) {
        e.preventDefault();
        // 发送ajax请求
        $.ajax({
            url: '/api/login',
            type: 'POST',
            data: {
                username: $('.login-box input[name="username"]').val(),
                password: $('.login-box input[name="password"]').val(),
            },
            success: (res) => {
                console.log(res);
                // 错误
                if (res.status != 0) {
                    return layer.msg(res.msg, { icon: 5 });
                };

                // 成功 跳转到首页，将登录页面的内容清空，保存token值
                location.href = '/index.html';
                $('#form_login')[0].reset();
                localStorage.setItem('token', res.token);
            }
        });
    })
})