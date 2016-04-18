function openPage(pageCode) {
    var src = "/" + pageCode + "/Index";
    openIframe(src);
}

function openIframe(src) {
    var iframeHeight = $(window).height() - $(".navbar").height();
    var content = '<iframe id="homeIframe" src="' + src + '" width="100%" height="' + iframeHeight + '" frameborder="no" border="0" marginwidth="0" marginheight="0" scrolling-x="no" scrolling-y="auto" allowtransparency="yes"></iframe>';
    $(".content-wrapper").html(content);
}

function logout() {
    window.location.href = "/UserAccount/Login";
}

function profile() {
    var src = "/UserAccount/Profile";
    openIframe(src);
}

$(function () {
    loginCheck(setUserName);
    $(".navbar-nav > li").click(function () {
        if ($(this).attr("data-code")) {
            $(this).siblings().removeClass("active");
            $(this).addClass("active");
            openPage($(this).attr("data-code"));

            $("#btnHomeRight").click(function () {
                var ifr = document.getElementById('homeIframe');
                var win = ifr.window || ifr.contentWindow;
                if (win.AddUser) {
                    win.AddUser();
                } else if (win.addPayItem) {
                    win.addPayItem();
                } else if (win.addOutlay) {
                    win.addOutlay();
                } else if (win.addSettlement) {
                    win.addSettlement();
                }
            });
            $(".navbar-title > span").html($(this)[0].innerText);
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

function showAddButton() {
    $("#btnHomeRight").show();
}

function hideAddButton() {
    $("#btnHomeRight").hide();
}