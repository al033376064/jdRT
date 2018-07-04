/*全局JS*/
(function () {
    //阻止表单提交
    $("form").submit(function (e) {
        e.preventDefault();
    });
    //页面刷新动画
    $(".pageloader").fadeOut(800);
    $("#g_web").show();
    //图片错误替换
    $("img").error(function () {
        $(this).attr("src", "/Content/images/null_img_2.png");
    });
    //主页滚动条 置顶图标
    $("#PageIndex").scroll(function () {
        var scrollTop = $(this).scrollTop();

        if (scrollTop > 40) {
            $("#gotoTop").slideDown();
        }
        else {
            $("#gotoTop").slideUp();
        }
    });
    $("#gotoTop").click(function () {
        $("#PageIndex").animate({ scrollTop: 0 }, 500);
    });
    //提示登录
    $("[data-action='showNotLogin']").click(function (e) {
        $(".NotLoginArea").show();
        e.preventDefault();
    });
    $(".NotLoginArea [data-action='close']").click(function () {
        $(".NotLoginArea").hide();
    });
}(window.console.log));
