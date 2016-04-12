$(function () {
    getPayItemList();
    //$(document).on('scroll', function (e) {
    //    if ($(e.target).scrollTop() >= $(document).height() - $(window).height()) {
    //        alert("e");
    //    }
    //});
});

function getPayItemList() {
    $.post("/PayItem/GetPayItemList", {}, function (data) {
        var result = eval("(" + data + ")");
        var html = '';
        for (var i = 0; i < result.length; i++) {
            html += '<li class="list-group-item" data-piId="' + result[i].piId + '">';
            html += '<div>';
            html += '<h4 class="list-group-item-heading">' + result[i].piName + '</h4>';
            html += '<p class="list-group-item-text">' + result[i].piRemark + '</p>';
            html += '</div>';
            html += '<div>';
            html += '<button class="btn btn-default" onclick="editPayItem(this)">编辑</button>';
            html += '<button class="btn btn-danger" onclick="deletePayItem(this)">删除</button>';
            html += '</div>';
            html += '</li>';
        }
        html += '<li style="clear:both;height:1px;"></li>';
        $(".list-group").html(html);
    });
}
function addPayItem() {
    $(".modal-title").html("新增");
    $('#myModal').modal('show')
    $("#txtPayItemName").val("");
    $("#txtRemark").val("");
}

function editPayItem(obj) {
    $(".modal-title").html("编辑");
    $('#myModal').modal('show')
    var content = $(obj).parent().parent();
    $("#txtPayItemName").val(content.find(".list-group-item-heading").html());
    $("#txtRemark").val(content.find(".list-group-item-text").html());
}

function submit() {
    if (addCheck() != true) {
        return;
    }
    var parms = new Object();
    parms["piName"] = $("#txtPayItemName").val();
    parms["piRemark"] = $("#txtRemark").val();


    if ($(".modal-title").html() == "新增") {
        $.post("/PayItem/AddPayItem", parms, function (data) {
            var result = eval("(" + data + ")");
            if (result.state == "success") {
                getPayItemList();
                $('#myModal').modal('hide');
            }
            else {
                alert(result.content);
            }
        })
    } else if ($(".modal-title").html() == "编辑") {
        var uaId = $(".list-group .active").attr("data-uaId");
        parms["uaId"] = uaId;
        $.post("/PayItem/EditPayItem", parms, function (data) {
            var result = eval("(" + data + ")");
            if (result.state == "success") {
                getPayItemList();
                $('#myModal').modal('hide');
            }
            else {
                alert(result.content);
            }
        })
    }
}

function deletePayItem(obj) {
    if (!confirm("是否删除此支出项?"))
        return;
    var parms = new Object();
    var li = $(obj).parent().parent();
    parms["piId"] = li.attr("data-piId");
    $.post("/PayItem/DeletePayItem", parms, function (data) {
        var result = eval("(" + data + ")");
        if (result.state == "success") {
            li.slideToggle("slow", function () {
                li.remove();
            });
        }
        else {
            alert(result.content);
        }
    })
}