import noScroll from "../global/noScroll";
const Popup = (function () {
  "use strict";
  const popUpBlock = $(".js-popup");
  const linkShowPopUp = $(".js-show-popup");
  const overlay = $(".js-overlay");

  return {
    initPopup: function () {
      linkShowPopUp.click(function (e) {
        e.preventDefault();
        const _this = $(this);
        const target = $(_this.data("target"));
        target.toggleClass("active");
        overlay.addClass("active");
        noScroll.on();
      });
    },
    closePopup: function () {
      $(".js-close, .js-btn-popup-success").click(function (e) {
        e.preventDefault();
        popUpBlock.removeClass("active");
        overlay.removeClass("active");
        noScroll.off();
      });
    },
    init: function () {
      Popup.initPopup();
      Popup.closePopup();
    },
  };
})();

export default Popup;
