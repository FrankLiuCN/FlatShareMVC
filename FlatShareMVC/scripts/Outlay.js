$(function () {
    getPayItemList();
    getUserList();
});

function addOutlay() {
    $(".modal-title").html("新增");
    $('#myModal').modal('show')
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

            html += '<div class="row">';
            html += '<div class="col-xs-4">';
            html += '<div class="input-group">';
            html += '<span class="input-group-addon">';
            html += '<input type="checkbox"></span>';
            html += '<span class="input-group-addon">' + result[i].uaUserName + '</span>';
            html += '</div>';
            html += '</div>';
            html += '<div class="col-xs-3">';
            html += '<input type="text" class="form-control">';
            html += '</div>';
            html += '<div class="col-xs-5">';
            html += '<input type="text" class="form-control">';
            html += '</div>';
            html += '</div>';
        }
        $(".details").html(html);
    });
}

