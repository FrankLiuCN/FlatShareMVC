$(function () {
    var cookieValue = getCookie('LoginInfo');
    if (cookieValue) {
        $("#txtUserName").val(getCookieParam(cookieValue, "LoginName"));
        $("#txtPassword").val(getCookieParam(cookieValue, "Password"));
        $("#ckbRemember").attr("checked", "checked");
    }
});

function LoginVerify() {
    var userName = $("#txtUserName").val();
    var password = $("#txtPassword").val();
    if (userName == "") {
        alert('用户名不能为空!');
        return;
    }
    if (password == "") {
        alert('密码不能为空!');
        return;
    }
    var parms = new Object();
    parms["userName"] = userName;
    parms["password"] = password;
    parms["remember"] = $("#ckbRemember").is(':checked');
    $.post("/UserAccount/LoginVerify", parms, loginResponse)
}

//处理登录的反馈信息
function loginResponse(data) {
    var result = eval("(" + data + ")");
    if (result.state == "success") {
        window.location.href = "/Home/Index";
    }
    else {
        alert(result.content);
    }
}