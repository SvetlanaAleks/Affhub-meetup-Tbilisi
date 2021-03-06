const Lang = (function () {
  "use strict";
  const linkChangeLang = $(".js-change-lang");
  const popUpBlockInit = $(".js-popup-init");
  const overlay = $(".js-overlay");

  return {
    initLang: function () {
      if (localStorage.getItem("initPopup") !== null) {
        popUpBlockInit.removeClass("active");
        overlay.removeClass("active");
      }
      if (
        window.location.pathname === "/" &&
        localStorage.getItem("lang") !== null
      ) {
        const currentLocation = localStorage.getItem("lang");
        location.href = "http://localhost:9000" + currentLocation;
      }
    },
    updateLangToLocal: function () {
      linkChangeLang.click(function () {
        const _this = $(this);
        const lang = _this.data("lang");
        localStorage.setItem("lang", lang);
        localStorage.setItem("local", "http://localhost:9000" + lang);

        if (localStorage.getItem("initPopup") === null) {
          popUpBlockInit.removeClass("active");
          overlay.removeClass("active");
          localStorage.setItem("initPopup", false);
        }
      });
    },
    init: function () {
      Lang.initLang();
      Lang.updateLangToLocal();
    },
  };
})();

export default Lang;
