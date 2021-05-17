var Submit = (function () {
  var errorMessages = {
    english: {
      name: {
        regExp: /([A-Za-zА-ЯЄІЇа-яєії])+$/,
        empty: "Name is required",
        notValid: "Invalid name",
      },
      phone: {
        regExp: /[0-9+()-\s]{5,}/,
        empty: "Phone number required",
        notValid: "Invalid phone number",
      },
      telegram: {
        regExp: /\@?[\d\w]{5,}/,
        empty: "Telegram login required",
        notValid: "Incorrect telegram",
      },
      skype: {
        regExp: /^[a-zA-Z][a-zA-Z0-9_.,-]{5,31}$/,
        empty: "Skype login required",
        notValid: "Incorrect skype",
      },
      viber: {
        regExp: /[0-9+()-\s]{5,}/,
        empty: "Viber required",
        notValid: "Incorrect viber",
      },
      whatsapp: {
        regExp: /[0-9+()-\s]{5,}/,
        empty: "WhatsApp required",
        notValid: "Incorrect WhatsApp",
      },
    },
    ru: {
      name: {
        regExp: /([A-Za-zА-ЯЄІЇа-яєії])+$/,
        empty: "Имя обязательно",
        notValid: "Некорректное имя",
      },
      phone: {
        regExp: /[0-9+()-\s]{5,}/,
        empty: "Номер телефона обязателен",
        notValid: "Некорректный номер телефона",
      },
      telegram: {
        regExp: /\@?[\d\w]{5,}/,
        empty: "Телеграм логин обязателен",
        notValid: "Некорректный telegram",
      },
      skype: {
        regExp: /^[a-zA-Z][a-zA-Z0-9_.,-]{5,31}$/,
        empty: "Skype логин обязателен",
        notValid: "Некорректный skype",
      },
      viber: {
        regExp: /[0-9+()-\s]{5,}/,
        empty: "Viber обязателен",
        notValid: "Некорректный Viber",
      },
      whatsapp: {
        regExp: /[0-9+()-\s]{5,}/,
        empty: "WhatsApp обязателен",
        notValid: "Некорректный WhatsApp",
      },
    },
    georgian: {
      name: {
        regExp: /([A-Za-zА-ЯЄІЇа-яєії])+$/,
        empty: "სახელი აუცილებელია",
        notValid: "სახელი არასწორია",
      },
      phone: {
        regExp: /[0-9+()-\s]{5,}/,
        empty: "ტელეფონის ნომერი ან დეპეშის შესვლა აუცილებელია",
        notValid: "Არასწორი მობილურის ნომერი",
      },
      telegram: {
        regExp: /\@?[\d\w]{5,}/,
        empty: "ტელეფონის ნომერი ან დეპეშის შესვლა აუცილებელია",
        notValid: "არასწორი დეპეშა",
      },
      skype: {
        regExp: /^[a-zA-Z][a-zA-Z0-9_.,-]{5,31}$/,
        empty: "Skype აუცილებელია",
        notValid: "არასწორი skype",
      },
      viber: {
        regExp: /[0-9+()-\s]{5,}/,
        empty: "Viber აუცილებელია",
        notValid: "არასწორი Viber",
      },
      whatsapp: {
        regExp: /[0-9+()-\s]{5,}/,
        empty: "WhatsApp აუცილებელია",
        notValid: "არასწორი WhatsApp",
      },
    },
  };
  var form = $("#registration_form");
  var inputLocation = $(".js-input-location");
  return {
    submitHandler: function submitHandler() {
      form.submit(function (e) {
        e.preventDefault();
        $(".form_error").remove();
        var errorFields = Submit.validateForm(form);

        if (errorFields.length) {
          Submit.showErrorFields(errorFields);
        } else {
          inputLocation.val("affhub.net/affhubmeetuptb");
          $.ajax({
            url: "https://api.apispreadsheets.com/data/12376/",
            type: "POST",
            contentType: false,
            processData: false,
            data: new FormData(this),
            success: function success() {
              $(".hide").hide();
              $(".check-in__success").show();
            },
            error: function () {
              alert("error");
            },
          });
        }
      });
    },
    showErrorFields: function showErrorFields(errorFields) {
      for (var i = 0; i < errorFields.length; i++) {
        var _errorFields$i = errorFields[i],
          name = _errorFields$i.name,
          msg = _errorFields$i.msg;
        var field = $("[name=".concat(name, "]"));
        field
          .parents(".form__input-wrap")
          .append('<div class="form_error"> '.concat(msg, "</div >"));
      }
    },
    validateInput: function validateInput(input) {
      if (!input.length) {
        return false;
      }

      var error = "";
      var value = input.val();
      var name = input.attr("name");

      if (!errorMessages[EVERlocale][name]) {
        return false;
      }
      var _errorMessages$name = errorMessages[EVERlocale][name],
        regExp = _errorMessages$name.regExp,
        empty = _errorMessages$name.empty,
        notValid = _errorMessages$name.notValid;

      if (value.length < 1) {
        error = empty;
      } else {
        var isValid = regExp.test(value);

        if (!isValid) {
          error = notValid;
        }
      }

      return error;
    },
    validateForm: function validateForm(form) {
      var inputs = form.find(".js-input");
      var errors = [];
      var validGroups = [];

      for (var i = 0; i < inputs.length; i++) {
        var input = $(inputs[i]);
        var name = input.attr("name");
        var group = "";

        if (errorMessages[EVERlocale][name]) {
          group = errorMessages[EVERlocale][name].group;
        }

        var error = Submit.validateInput(input);

        if (error) {
          if (group) {
            errors.push({
              name: name,
              msg: error,
              group: group,
            });
          } else {
            errors.push({
              name: name,
              msg: error,
            });
          }
        } else {
          if (group && validGroups.indexOf(group) === -1) {
            validGroups.push(group);
          }
        }
      }

      var filteredErrors = errors.filter(function (error) {
        var group = error.group;

        if (!group) {
          return error;
        } else {
          if (validGroups.indexOf(group) !== -1) {
            return false;
          } else {
            return error;
          }
        }
      });
      return filteredErrors;
    },
    init: function init() {
      Submit.submitHandler();
    },
  };
})();

export default Submit;
