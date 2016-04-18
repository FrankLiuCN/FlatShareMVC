$(function () {
    getOutlayList(pageSize, pageNum, true);
    getPayItemList();
    getUserList();
    $(".cover").click(function () {
        $(".active").removeClass("active");
        hidEditPanel();
    });
    $('.datepicker').datepicker();
    $('.datepicker').css("z-index", "9999");
    parent.showAddButton();

    $(document).on('scroll', function (e) {
        if ($(e.target).scrollTop() >= $(document).height() - $(window).height()) {
            pageNum++;
            getOutlayList(pageSize, pageNum, false);
        }
    });
});

var pageNum = 0;
var pageSize = 10;

function hidEditPanel() {
    $(".cover").removeClass("show");
    $(".btn-group-justified").removeClass("show");
    $("body").css("overflow", "auto");
}
function addOutlay() {
    $(".modal-title").html("新增");
    $('#myModal').modal('show')
    $('#myModal .btn-primary').show();
    showDetails(true);
}

function getPayItemList() {
    $.post("/PayItem/GetPayItemList", {}, function (data) {
        var result = eval("(" + data + ")");
        for (var i = 0; i < result.length; i++) {
            $("#cbxPayItem").append('<option value=' + result[i].piId + '>' + result[i].piName + '</option>')
        }
    });
}

function getUserList() {
    $.post("/UserAccount/GetUserList", {}, function (data) {
        var result = eval("(" + data + ")");
        var html = '';
        for (var i = 0; i < result.length; i++) {
            $("#cbxPayUser").append('<option value=' + result[i].uaId + '>' + result[i].uaUserName + '</option>')
        }
    });
}

function showDetails(checked) {
    var html = '';
    $("#cbxPayUser option").each(function () {
        html += '<tr class="odd gradeX" data-uaId="' + $(this).val() + '">';
        if (checked) {
            html += '<td><input type="checkbox" name="ckb" checked="checked"></td>';
        } else {
            html += '<td><input type="checkbox" name="ckb"></td>';
        }
        html += '<td>' + $(this).text() + '</td>';
        html += '<td><input type="text" class="form-control" name="olPayMoney"></td>';
        html += '<td><input type="text" class="form-control" name="olRemark"></td>';
        html += '</tr>';
    });
    $(".details tbody").html(html);
}

function getOutlayInfo(oId, callback) {
    $.post("/Outlay/GetOutlayInfo", { oId: oId }, function (data) {
        var result = eval("(" + data + ")");
        if (callback) {
            callback(result);
        }
    });
}

function getOutlayList(take, skip, init) {
    $.post("/Outlay/GetOutlayList", { take: take, skip: skip }, function (data) {
        var result = eval("(" + data + ")");
        var html = '';
        if (init) {
            html += '<div class="list-title">';
            html += '<div><h4>支出名称</h4></div>';
            html += '<div><h4>支出金额</h4></div>';
            html += '<div><h4>支付人</h4></div>';
            html += '<div><h4>支付日期</h4></div>';
            html += '<div><h4>备注</h4></div>';
            html += '</div>';
        }
        for (var i = 0; i < result.length; i++) {
            var oDate = result[i].oDate.replace("T00:00:00", "");
            html += '<div class="list-content" data-oId="' + result[i].oId + '">';
            html += '<div><h5>支出名称：</h5>' + result[i].piName + '</div>';
            html += '<div><h5>支出金额：</h5>' + result[i].oTotalMoney + '</div>';
            html += '<div><h5>支付人：</h5>' + result[i].uaUserName + '</div>';
            html += '<div><h5>支付日期：</h5>' + oDate + '</div>';
            html += '<div><h5>备注：</h5>' + result[i].oRemark + '</div>';
            html += '</div>';
        }
        if (init) {
            $(".list-group").html(html);
        } else {
            $(html).appendTo($(".list-group"));
        }
        $(".list-content").dblclick(function () {
            var oId = $(this).attr("data-oId");
            showOutlayInfo(oId);
        });

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

function showOutlayInfo(oId) {
    if (!oId) {
        oId = $(".list-group .active").attr("data-oId");
    }
    $(".modal-title").html("查看");
    $('#myModal').modal('show')
    $('#myModal .btn-primary').hide();
    getOutlayInfo(oId, function (result) {
        var outlay = result.outlay;
        var outlayLines = result.outlayLines;
        $("#cbxPayItem").val(outlay.opiId);
        $("#txtTotalMoney").val(outlay.oTotalMoney);
        $("#cbxPayUser").val(outlay.ouaId);
        var oDate = outlay.oDate.replace("T00:00:00", "");
        $("#txtDate").val(oDate);
        $("#txtRemark").val(outlay.oRemark);

        showDetails();
        //var html = '';

        for (var i = 0; i < outlayLines.length; i++) {
            $(".details tbody tr").each(function () {
                if ($(this).attr("data-uaId") == outlayLines[i].oluaId) {
                    $(this).find("input[name='ckb']").attr("checked", "checked");
                    $(this).find("input[name='olPayMoney']").val(outlayLines[i].olPayMoney);
                    $(this).find("input[name='olRemark']").val(outlayLines[i].olRemark);
                    return false;
                }
            });
        }
        //$(html).appendTo($(".list-group"));
    });

}

function submit() {
    if (checkData() == false) {
        return;
    }
    var parms = new Object();
    parms["oTotalMoney"] = $("#txtTotalMoney").val();
    parms["opiId"] = $("#cbxPayItem").val();
    parms["oDate"] = $("#txtDate").val();
    parms["oRemark"] = $("#txtRemark").val();
    parms["ouaId"] = $("#cbxPayUser").val();

    var totalMoney = 0.00;
    var lines = new Array();
    $(".details tbody tr").each(function () {
        if ($(this).find("input[name='ckb']").is(':checked') == true) {
            if ($(this).find("input[name='olPayMoney']").val() == "") {
                alert("打钩的人员金额不能为空");
                return;
            }
            var line = {
                oluaId: $(this).attr("data-uaId"),
                olPayMoney: $(this).find("input[name='olPayMoney']").val(),
                olRemark: $(this).find("input[name='olRemark']").val()
            };
            lines.push(line);
            totalMoney += parseFloat($(this).find("input[name='olPayMoney']").val());
        }
    });

    if (parseFloat($("#txtTotalMoney").val()) != totalMoney) {
        if (!confirm("个人金额相加不等于总支出金额，是否继续提交?")) {
            return;
        }
    }

    var OutlayInfoModel = {
        OutlayInfo: parms,
        OutlayLines: lines
    };

    $.post("/Outlay/AddOutlayInfo", { modelJson: JSON.stringify(OutlayInfoModel) }, function (data) {
        var result = eval("(" + data + ")");
        if (result.state == "success") {
            getOutlayList(10, 0, true);
            $('#myModal').modal('hide');
        }
        else {
            alert(result.content);
        }
    });
}

function checkData() {
    if ($("#txtTotalMoney").val() == "") {
        alert("金额不能为空");
        return false;
    }
    if ($("#txtDate").val() == "") {
        alert("支付日期不能为空");
        return false;
    }
    return true;
}

function deleteOutlayInfo() {
    if (!confirm("是否删除选中信息?"))
        return;
    var oId = $(".list-group .active").attr("data-oId");
    var parms = new Object();
    parms["oId"] = oId;
    $.post("/Outlay/DeleteOutlayInfo", parms, function (data) {
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