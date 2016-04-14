$(function () {
    getUserList();
    $(".cover").click(function () {
        $(".active").removeClass("active");
        hidEditPanel();
    });

    //$(document).on('scroll', function (e) {
    //    if ($(e.target).scrollTop() >= $(document).height() - $(window).height()) {
    //        alert("e");
    //    }
    //});
    parent.showAddButton();
});

function AddUser() {
    $(".modal-title").html("新增");
    $("#txtLoginName").val("");
    $("#txtUserName").val("");
    $("#txtPassword").val("");
    $("#txtTelephone").val("");
    $("#cbxEnable").attr("checked", false);
    $("#txtRemark").val("");
    $('#myModal').modal('show')
    $("#txtLoginName").attr("readonly", false);
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
            html += '<div class="list-content" data-uaId="' + result[i].uaId + '" data-uaLoginName="' + result[i].uaLoginName + '" ';
            html += 'data-uaUserName="' + result[i].uaUserName + '" data-uaTelephone="' + result[i].uaTelephone + '" ';
            html += 'data-uaEnable="' + result[i].uaEnable + '" data-uaRemark="' + result[i].uaRemark + '" data-uaPassword="' + result[i].uaPassword + '">';
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
            if ($(".btn-group-justified div:eq(0)").css("display") == "none") {
                $(".cover").addClass("show");
                $(".btn-group-justified").addClass("show");
                $("body").css("overflow", "hidden");
            }
        });

        $(".list-content").mouseover(function () {
            $(this).addClass("hover");
        }).mouseleave(function () {
            $(this).removeClass("hover");
        });
    });
}

function submit() {
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

    if ($(".modal-title").html() == "新增") {
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
    } else if ($(".modal-title").html() == "编辑") {
        var uaId = $(".list-group .active").attr("data-uaId");
        parms["uaId"] = uaId;
        $.post("/UserAccount/EditUser", parms, function (data) {
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

function deleteUser() {
    if (!confirm("是否删除选中用户?"))
        return;
    var uaId = $(".list-group .active").attr("data-uaId");
    var parms = new Object();
    parms["uaId"] = uaId;
    $.post("/UserAccount/DeleteUser", parms, function (data) {
        var result = eval("(" + data + ")");
        if (result.state == "success") {
            $(".list-group .active").slideToggle("slow", function () {
                $(".list-group .active").remove();
            });
            hidEditPanel();
        }
        else {
            alert(result.content);
        }
    })
}

function editUser() {
    $(".modal-title").html("编辑");
    $('#myModal').modal('show')
    var selected = $(".list-group .active");
    $("#txtLoginName").val(selected.attr("data-uaLoginName"));
    $("#txtUserName").val(selected.attr("data-uaUserName"));
    $("#txtPassword").val(selected.attr("data-uaPassword"));
    $("#txtTelephone").val(selected.attr("data-uaTelephone"));
    if (selected.attr("data-uaEnable") == "true") {
        $("#cbxEnable").attr("checked", "checked");
    } else {
        $("#cbxEnable").attr("checked", false);
    }
    $("#txtRemark").val(selected.attr("data-uaRemark"));
    $("#txtLoginName").attr("readonly", "readonly");
}

function hidEditPanel() {
    $(".cover").removeClass("show");
    $(".btn-group-justified").removeClass("show");
    $("body").css("overflow", "auto");
}