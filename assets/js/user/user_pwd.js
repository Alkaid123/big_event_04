$(function () {
    // 1、定义校验规则
    let form = layui.form;
    form.verify({
        // 1、密码
        pwd: [
            /^[\S]{6,12}$/
            , '密码必须6到12位，且不能出现空格'
        ],
        // 2、新密码，新密码不能与旧密码重复
        samepwd: function (value) {
            // console.log(value);
            let pwd = $('[name="oldPwd"]').val();
            // console.log(pwd);
            if (pwd === value) {
                return '新密码不能与原密码相同';
            };
        },
        // 3、确认新密码，确认新密码必须与新密码一致
        rePwd: function (value) {
            let newPwd = $('[name="newPwd"]').val();
            if (newPwd !== value) {
                return '确认新密码必须与新密码一致';
            };
        }

    });

    // 2、提交表单
    $('.layui-form').on('submit', function (e) {
        // 阻止表单的默认提交
        e.preventDefault();

        // 发送ajax请求
        $.ajax({
            url: '/my/updatepwd',
            type: 'POST',
            data: $(this).serialize(),
            success: (res) => {
                console.log(res);
                // 错误
                if (res.status != 0) {
                    return layer.msg(res.message, { icon: 5 });
                };

                // 成功 弹框 重新渲染页面
                layer.msg('重置密码成功！', { icon: 6 });
                $('.layui-form')[0].reset();
            }
        });
    })
})