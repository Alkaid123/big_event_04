$(function () {
    let form = layui.form;
    form.verify({
        nickname: function (value) {
            if (value.length > 6) {
                return "昵称长度为1~6位之间"
            }
        }
    });

    // 用户渲染
    initUserInfo();

    let layer = layui.layer;
    // 封装函数 用户渲染
    function initUserInfo() {
        $.ajax({
            url: '/my/userinfo',
            type: 'GET',
            success: (res) => {
                // console.log(res);
                // 错误
                if (res.status != 0) {
                    return layer.msg(res.message, { icon: 5 });
                };
                // 成功，渲染页面
                form.val('formUserInfo', res.data)
            }
        });
    };

    // 重置表单
    $('#btnReset').on('click', function (e) {
        // 阻止表单默认提交
        e.preventDefault();
        // 重新渲染
        initUserInfo();
    })


    // 更新用户信息
    $('.layui-form').on('submit', function (e) {
        // 阻止表单的默认提交行为
        e.preventDefault();
        // 发送ajax请求
        $.ajax({
            url: '/my/userinfo',
            type: 'POST',
            data: $(this).serialize(),
            success: (res) => {
                console.log(res);
                // 错误
                if (res.status != 0) {
                    return layer.msg(res.message, { icon: 5 });
                };
                // 成功，渲染页面
                layer.msg('恭喜，修改用户信息成功', { icon: 6 });
                window.parent.getUserInfo()
            }
        });
    })
});