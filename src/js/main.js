// Main JS module
import "select2/dist/js/select2.full";
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

  layout.layoutHandler({
    onInit: (layout) => {
      $(".js-select")
        .select2({
          minimumResultsForSearch: Infinity,
          placeholder: " ",
        })
        .on("change", function (e) {
          const _this = $(this);
          console.log(_this.val());
          $("#nickname").attr("name", _this.val());
        });
    },
  });
});
