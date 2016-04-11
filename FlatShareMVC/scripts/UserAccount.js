$(function () {
    $(".list-content").click(function () {
        $(".cover").css("display", "block");
        $(".btn-group-justified").css("display", "block");
        $("body").css("overflow", "hidden");
    });
    $(".cover").click(function () {
        $(".cover").css("display", "none");
        $(".btn-group-justified").css("display", "none");
        $("body").css("overflow", "auto");
    });
});