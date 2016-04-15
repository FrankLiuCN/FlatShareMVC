$(function () {
    //$(document).on('scroll', function (e) {
    //    if ($(e.target).scrollTop() >= $(document).height() - $(window).height()) {
    //        alert("e");
    //    }
    //});
    getSettlementInfoList();
    $('.datepicker').datepicker();
    $('.datepicker').css("z-index", "9999");
    parent.showAddButton();

});

function getSettlementInfoList() {
    $.post("/Settlement/GetSettlementInfoList", {}, function (data) {
        var result = eval("(" + data + ")");
        var html = '';
        for (var i = 0; i < result.length; i++) {
            html += '<li class="list-group-item" data-piId="' + result[i].SettlementInfo.sId + '">';
            html += ' <div class="row">';
            html += '<div class="col-xs-6">';
            html += '<span>开始日期 : </span> ' + result[i].SettlementInfo.sStartDate.replace("T00:00:00", "");
            html += '</div>';
            html += '<div class="col-xs-6">';
            html += '<span>结束日期 : </span> ' + result[i].SettlementInfo.sEndDate.replace("T00:00:00", "");
            html += '</div>';
            html += '</div>';
            html += ' <div class="row">';
            html += '<div class="col-xs-6"> ';
            html += '<span>总支出 : </span> ' + result[i].SettlementInfo.sTotalCost;
            html += '</div>';
            html += '<div class="col-xs-6">';
            html += '<span>结算日期 : </span> ' + result[i].SettlementInfo.sUpdatedDate.substring(0, 10);
            html += '</div>';
            html += '</div>';
            html += '<div class="row">';
            html += '<div class="col-xs-12">';
            html += '<table class="table table-bordered details">';
            html += '<thead>';
            html += '<tr>';
            html += '<th style="width:28%;">人员</th>';
            html += '<th style="width:23%;">应支付</th>';
            html += '<th style="width:25%;">实际支付</th>';
            html += '<th>结算</th>';
            html += '</tr>';
            html += '</thead>';
            html += '<tbody>';
            for (var j = 0; j < result[i].SettlementLineInfos.length; j++) {
                var temp=result[i].SettlementLineInfos[j];
                html += '<tr>';
                html += '<td>' + temp.uaUserName + '</td>';
                html += '<td>' + temp.sPayable + '</td>';
                html += '<td>' + temp.sActuallyPay + '</td>';
                html += '<td>' + temp.sBalance + '</th>';
                html += '</tr>';
            }
            html += '</tbody>';
            html += '</table>';
            html += '</div>';
            html += '</div>';
            html += '</li>';
        }
        html += '<li style="clear:both;height:1px;"></li>';
        $(".list-group").html(html);
    });
}

function addSettlement() {
    $(".modal-title").html("新增");
    $('#myModal').modal('show')
    $('#myModal .btn-primary').show();
    //showDetails(true);
}

function submit() {
    var start = $("#txtStartDate").val();
    var end = $("#txtEndDate").val();
    $.post("/Settlement/GenerateSettlement", { start: start, end: end }, function (data) {
        var result = eval("(" + data + ")");
        if (result.state == "success") {
            $('#myModal').modal('hide');
            getSettlementInfoList();
        }
        else {
            alert(result.content);
        }
    });

}