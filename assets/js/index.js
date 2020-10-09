$(function() {
    getUserInof();

    //退出
    var layer = layui.layer;
    $("#btnLongout").on("click", function() {
        layer.confirm('是否确认退出', { icon: 3, title: '提示' }, function(index) {
            localStorage.removeItem("token");
            location.href = "/login.html"

            layer.close(index);
        })
    })
});

function getUserInof() {
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',
        // headers: {
        //     Authorization: localStorage.getItem("token") || ""
        // },
        success: function(res) {
            // console.log(res);
            if (res.status !== 0) {
                return layui.layer.msg(res.message);
            }
            renderAvatar(res.data);
        },
        // complete: function(res) {
        //     console.log(res);
        //     if (res.responseJSON.status === 1 && res.responseJSON.message === "身份认证失败！") {
        //         //清空本地token
        //         localStorage.removeItem("token");
        //         //页面跳转
        //         location.href = "/login.html"
        //     }
        // }
    })
}

// 封装用户头像渲染函数
function renderAvatar(user) {
    var name = user.nickname || user.username;
    $("#welcome").html("欢迎&nbsp;&nbsp;" + name);
    if (user.user_pic !== null) {
        //有头像
        $(".layui-nav-img").show().attr("src", user.user_pic);
        $(".user-avatar").hide();
    } else {
        //没头像
        $(".layui-nav-img").hide();
        var text = name[0].toUpperCase();
        $(".user-avatar").show().html(text);
    }
}