"use strict";

var auth = {
  showLogin: function showLogin() {
    if (!firebase.auth().currentUser) {
      var provider = new firebase.auth.OAuthProvider('microsoft.com');
      firebase.auth().signInWithPopup(provider).then(function (result) {
        $("#login").hide();
        $("#myprofile, #logout").show();
        localStorage.setItem(config.isloggedin, "true");
        console.log("Success: " + result);
      })["catch"](function (error) {
        // Handle error.
        console.log("error" + error);
      });
    }
  },
  logout: function logout() {
    if (localStorage.getItem(config.isloggedin) === "true") {
      firebase.auth().signOut();
      localStorage.setItem(config.isloggedin, "false");
      $("#login").show();
      $("#myprofile, #logout").hide();
    }
  }
};
"use strict";

var config = {
  mainView: "#view",
  isloggedin: "isloggedin"
};
"use strict";

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyDL-vEobMb_AeJ6NcEwqWzops9I9C0pR0w",
  authDomain: "hrforecastsystem.firebaseapp.com",
  databaseURL: "https://hrforecastsystem.firebaseio.com",
  projectId: "hrforecastsystem",
  storageBucket: "",
  messagingSenderId: "645473796645",
  appId: "1:645473796645:web:a3539d18ce83b3a73735cc",
  measurementId: "G-Y7RKP3CTBQ"
}; // Initialize Firebase

firebase.initializeApp(firebaseConfig);

function handleShowLogin() {
  auth.showLogin();
}

function handleShowRegister() {
  auth.showRegister();
}

window.onload = function () {
  handleUrl(location.href);
  $("#login").show();
  $("#myprofile, #logout").hide();

  if (localStorage.getItem(config.isloggedin) === "true") {
    $("#login").hide();
    $("#myprofile, #logout").show();
  }
};

function handleUrl(url) {
  var params = getUrlParams(url);

  if (Object.keys(params).length == 0) {
    var urlParts = url.split("/");
    var navigate = urlParts.pop();
    var urlToOpen = urlRedirect[navigate];
  } else {
    urlRedirect[params.mode](params.oobCode);
  }
}

function getUrlParams(url) {
  var params = {};
  var parts = url.replace(/[?&]+([^=&]+)=([^&]*)/gi, function (m, key, value) {
    params[key] = value;
  });
  return params;
}

var urlRedirect = {
  login: auth.showLogin,
  register: auth.showRegister
};