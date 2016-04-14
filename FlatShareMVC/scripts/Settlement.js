$(function () {
    //$(document).on('scroll', function (e) {
    //    if ($(e.target).scrollTop() >= $(document).height() - $(window).height()) {
    //        alert("e");
    //    }
    //});
    $('.datepicker').datepicker();
    $('.datepicker').css("z-index", "9999");
    parent.showAddButton();

});

function addSettlement() {
    $(".modal-title").html("新增");
    $('#myModal').modal('show')
    $('#myModal .btn-primary').show();
    //showDetails(true);
}