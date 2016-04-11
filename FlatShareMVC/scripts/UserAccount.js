$(function () {
    getUserList();

    $(".cover").click(function () {
        $(".cover").css("display", "none");
        $(".btn-group-justified").css("display", "none");
        $("body").css("overflow", "auto");
    });

    //$(document).on('scroll', function (e) {
    //    if ($(e.target).scrollTop() >= $(document).height() - $(window).height()) {
    //        alert("e");
    //    }
    //});
});

function AddUserAccount() {
    $('#myModal').modal('show')
}

function getUserList() {
    $.post("/UserAccount/GetUserList", {}, function (data) {
        var result = eval("(" + data + ")");
        var html = '';

        html += '<div class="list-title">';
        html += '<div><h4>登录名</h4></div>';
        html += '<div><h4>姓名</h4></div>';
        html += '<div><h4>手机号</h4></div>';
        html += '<div><h4>是否启用</h4></div>';
        html += '<div><h4>备 注</h4></div>';
        html += '</div>';
        for (var i = 0; i < result.length; i++) {
            html += '<div class="list-content">';
            html += '<div><h5>登 录 名：</h5>' + result[i].uaLoginName + '</div>';
            html += '<div><h5>姓 名：</h5>' + result[i].uaUserName + '</div>';
            html += '<div><h5>手 机 号：</h5>' + result[i].uaTelephone + '</div>';
            html += '<div><h5>是否启用：</h5>' + result[i].uaEnable + '</div>';
            html += '<div><h5>备 注：</h5>' + result[i].uaRemark + '</div>';
            html += '</div>';
        }
        $(".list-group").html(html);
        $(".list-content").click(function () {
            $(".active").removeClass("active");
            $(this).addClass("active");
            $(".cover").css("display", "block");
            $(".btn-group-justified").css("display", "block");
            $("body").css("overflow", "hidden");
        });

        $(".list-content").mouseover(function () {
            $(this).addClass("hover");
        }).mouseleave(function () {
            $(this).removeClass("hover");
        });
    });
}

function addUser() {
    if (addCheck() != true) {
        return;
    }
    var parms = new Object();
    parms["uaLoginName"] = $("#txtLoginName").val();
    parms["uaUserName"] = $("#txtUserName").val();
    parms["uaPassword"] = $("#txtPassword").val();
    parms["uaTelephone"] = $("#txtTelephone").val();
    parms["uaEnable"] = $("#cbxEnable").is(':checked');
    parms["uaRemark"] = $("#txtRemark").val();
    $.post("/UserAccount/AddUser", parms, function (data) {
        var result = eval("(" + data + ")");
        if (result.state == "success") {
            getUserList();
            $('#myModal').modal('hide');
        }
        else {
            alert(result.content);
        }
    })
}

function addCheck() {
    if ($("#txtLoginName").val() == "") {
        return false;
    }
    if ($("#txtUserName").val() == "") {
        return false;
    }
    if ($("#txtPassword").val() == "") {
        return false;
    }
    return true;
}