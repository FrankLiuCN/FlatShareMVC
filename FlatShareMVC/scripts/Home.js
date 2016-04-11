function openPage(pageCode) {
    var iframeHeight = $(window).height() - $(".navbar").height();
    var src = "/" + pageCode + "/Index";
    var content = '<iframe id="homeIframe" src="' + src + '" width="100%" height="' + iframeHeight + '" frameborder="no" border="0" marginwidth="0" marginheight="0" scrolling-x="no" scrolling-y="auto" allowtransparency="yes"></iframe>';
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

            $(".navbar-title").html($(this)[0].innerText);
        }
        $(".navbar-offcanvas-fade").removeClass("in");
    });
    $(".navbar-offcanvas-fade").click(function () {
        $(".navbar-offcanvas-fade").removeClass("in");
    });

    $(window).resize(function () {
        $("#homeIframe").attr('height', $(window).height() - $(".navbar").height());
    });
});

function setUserName(userName) {
    $("#lblUserName").html(userName);

}