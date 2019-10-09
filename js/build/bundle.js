"use strict";

var auth = {
  showLogin: function showLogin() {
    $("".concat(config.mainView)).load("./views/login.html");
    window.history.pushState({}, "Login", "login");
  },
  showRegister: function showRegister() {
    $("".concat(config.mainView)).load("./views/register.html");
    window.history.pushState({}, "Register", "register");
  }
};
"use strict";

var config = {
  mainView: "#view"
};
"use strict";

function handleShowLogin() {
  auth.showLogin();
}

function handleShowRegister() {
  auth.showRegister();
}