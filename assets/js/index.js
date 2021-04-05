// 入口函数
$(function () {
    // 1、用于获取用户信息
    getUserInfo();

    // 2、退出
    $('#btnLogout').on('click', function () {
        // 询问
        layer.confirm('确定退出登录？', { icon: 3, title: '提示' }, function (index) {
            //清空token值，跳转到登录页
            localStorage.removeItem('token');
            location.href = '/login.html';
            layer.close(index);
        });
    });


});

// 用户信息，全局函数
function getUserInfo() {
    // 发送ajax请求
    $.ajax({
        url: '/my/userinfo',
        type: 'GET',
        data: {},
        success: (res) => {
            // console.log(res);
            // 请求失败
            if (res.status != 0) {
                return layer.msg(res.message, { icon: 5 });
            }

            // 请求成功，渲染头像
            renderAvatar(res.data)
        }
    });
};

// 渲染头像
function renderAvatar(user) {
    // 1、渲染名称（nickname优先，如果没有，就用username）
    let name = user.nickname || user.username;
    $('#welcome').html(`欢迎 &nbsp;&nbsp;${name}`);
    // 2、渲染头像 如果用户上传了头像 则用头像，如果没有，则用名字首字母大写
    if (user.user_pic) {
        // 有头像
        $('.layui-nav-img').attr('src', user.user_pic);
        $('.avatar').hide();
    } else {
        let text = name[0].toUpperCase();
        $('.layui-nav-img').hide()
        $('.avatar').show().html(text);
    }
}