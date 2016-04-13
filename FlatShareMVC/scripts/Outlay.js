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
            html += '<tr class="odd gradeX">';
            html += '<td><input type="checkbox"></td>';
            html += '<td>' + result[i].uaUserName + '</td>';
            html += '<td><input type="text" class="form-control"></td>';
            html += '<td><input type="text" class="form-control"></td>';
            html += '</tr>';
        }
        $(".details tbody").html(html);
    });
}

