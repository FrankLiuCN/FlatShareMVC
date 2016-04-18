$(function () {
    getUserInfo();
    parent.hideAddButton();

});

function getUserInfo() {
    $.post("/UserAccount/GetUserInfo", { }, function (data) {
        var result = eval("(" + data + ")");
        $("#txtLoginName").val(result.uaLoginName);
        $("#txtUserName").val(result.uaUserName);
        $("#txtPhone").val(result.uaTelephone);
    });

}

function modfiyPassword() {
    if ($("#txtOldPassword").val() == "") {
        alert("旧密码不能为空");
        return;
    }
    if ($("#txtNewPassword").val() == "") {
        alert("新密码不能为空");
        return;
    } 
    if ($("#txtNewPassword").val() != $("#txtConfirmPassword").val()) {
        alert("新密码和确认密码不一致.");
        return;
    }

    var OldPassword = $("#txtOldPassword").val();
    var NewPassword = $("#txtNewPassword").val();
    $.post("/UserAccount/ModifyPassword", { oldPassword: OldPassword, newPassword: NewPassword }, function (data) {
        var result = eval("(" + data + ")");
        alert(result.content);
    });
}
