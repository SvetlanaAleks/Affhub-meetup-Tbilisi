// Main JS module
// objectFitImages polyfill
import layout from "./global/layout";

import objectFitImages from "object-fit-images";
import Controls from "./modules/Controls";
import Menu from "./modules/Menu";
import Popup from "./modules/Popup";
import Lang from "./modules/Lang";
import Submit from "./modules/Submit";

$(function () {
  objectFitImages();
  Controls.init();
  Menu.init();
  Popup.init();
  Lang.init();
  Submit.init();

  document.body.onload = function () {
    setTimeout(function () {
      var preloader = document.getElementById("preloader");

      if (!preloader.classList.contains("cansel")) {
        preloader.classList.add("cansel");
      }
    }, 200);
  };
});
