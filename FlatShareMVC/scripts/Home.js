function openPage(pageCode) {
    var src = "/" + pageCode + "/Index";
    var content = '<iframe src="' + src + '" width="100%" height="' + ($(window).height() - 120) + '" frameborder="no" border="0" marginwidth="0" marginheight="0" scrolling-x="no" scrolling-y="auto" allowtransparency="yes"></iframe>';
    $(".content-wrapper").html(content);
}

function logout() {
   window.location.href = "/UserAccount/Login";
}

$(function () {
    $(".navbar-nav > li").click(function () {
        if ($(this).attr("data-code")) {
            $(this).siblings().removeClass("active");
            $(this).addClass("active");
            openPage($(this).attr("data-code"));
        }
    });
});