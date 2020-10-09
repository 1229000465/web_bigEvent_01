$(function() {
    var form = layui.form;
    form.verify({
        nickname: function(value) {
            if (value.length > 6) {
                return "昵称长度为1~6之间"
            }
        }
    });

    //初始化用户信息
    initUserInfo();
    //初始化信息封装
    var layer = layui.layer;

    function initUserInfo() {
        $.ajax({
            url: '/my/userinfo',
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg(res.message);
                }
                //成功后渲染
                form.val('formUserInfo', res.data)
            }
        })
    }

    //表单重置
    $("#btnReset").on("click", function(e) {
        //阻止重置
        e.preventDefault();
        //重新渲染
        initUserInfo();
    });

    //修改用户信息
    $(".layui-form").on("submit", function(e) {
        e.preventDefault();
        $.ajax({
            method: 'POST',
            url: '/my/userinfo',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg(res.message);
                }
                layer.msg("修改成功")
                window.parent.getUserInof();
            }
        })
    })
})