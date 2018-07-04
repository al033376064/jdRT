var htmlFontSize = loadHtmlFontSize();
window.onresize = function () {
    htmlFontSize = loadHtmlFontSize();
};
function loadHtmlFontSize() {
    var clientWidth = document.documentElement ? document.documentElement.clientWidth : document.body.clientWidth;
  
    document.documentElement.style.fontSize = clientWidth * 1 / 10 + "px";
    return clientWidth * 1 / 10;
}