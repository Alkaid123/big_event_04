$(function () {
    // 1.1 获取裁剪区域的 DOM 元素
    var $image = $('#image')
    // 1.2 配置选项
    const options = {
        // 纵横比
        aspectRatio: 1,
        // 指定预览区域
        preview: '.img-preview'
    }

    // 1.3 创建裁剪区域
    $image.cropper(options);

    // 点击上传，
    $('#btnChooseImage').on('click', function () {
        $('#file').click();
        console.log(1111);
    });

    // 修改裁剪的图片
    let layer = layui.layer;
    $('#file').on('change', function (e) {
        // 拿到用户选择的文件
        let file = e.target.files[0];

        // 非空校验
        if (file === undefined) {
            return layer.msg('您可以选择一张图片');
        };

        // 2. 将文件，转化为路径
        var imgURL = URL.createObjectURL(file)
        // 3. 重新初始化裁剪区域
        $image
            .cropper('destroy') // 销毁旧的裁剪区域
            .attr('src', imgURL) // 重新设置图片路径
            .cropper(options) // 重新初始化裁剪区域
        // console.log(imgURL);
    });

    // 上传头像
    $('#btnUpload').on('click', function () {
        // 拿到用户裁剪之后的头像
        var dataURL = $image
            .cropper('getCroppedCanvas', {
                // 创建一个 Canvas 画布
                width: 100,
                height: 100
            })
            .toDataURL('image/png');

        // 发送 ajax
        $.ajax({
            url: '/my/update/avatar',
            type: 'POST',
            data: {
                avatar: dataURL,
            },
            success: (res) => {
                // console.log(res);
                // 错误
                if (res.status != 0) {
                    return layer.msg(res.message, { icon: 5 });
                };

                // 成功 弹框 渲染头像
                layer.msg('恭喜你，更换头像成功', { icon: 6 });
                window.parent.getUserInfo();
            }
        });
    })
});