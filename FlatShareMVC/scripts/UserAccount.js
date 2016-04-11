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

    $(document).on('scroll', function (e) {
        if ($(e.target).scrollTop() >= $(document).height() - $(window).height()) {
            alert("e");
        }
    });
});

function AddUserAccount() {
    alert("AddUserAccount");
}