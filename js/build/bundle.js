"use strict";

var auth = {
  showLogin: function showLogin() {
    if (!firebase.auth().currentUser) {
      var provider = new firebase.auth.OAuthProvider('microsoft.com');
      firebase.auth().signInWithPopup(provider).then(function (user) {})["catch"](function (error) {
        // Handle error.
        console.log("error" + error);
      });
    }
  },
  logout: function logout() {
    if (localStorage.getItem(config.isloggedin) === "true") {
      firebase.auth().signOut();
    }
  }
};
"use strict";

var config = {
  mainView: "#view",
  isloggedin: "isloggedin"
};
var endpoints = {};
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
firebase.auth().onAuthStateChanged(function (user) {
  if (user) {
    $("#login").hide();
    $("#myprofile, #logout").show();
    localStorage.setItem(config.isloggedin, "true");
    $("#myprofile button").text(user.displayName);
    showDashboard();
  } else {
    $("#login").show();
    $("#myprofile, #logout").hide();
    localStorage.setItem(config.isloggedin, "false");
  }
});

function handleShowLogin() {
  auth.showLogin();
}

function handleShowRegister() {
  auth.showRegister();
}

function showDashboard() {
  try {
    var userId = firebase.auth().currentUser.email.split("@")[0];
    firebase.database().ref('/employees/' + userId).once('value').then(function (snapshot) {
      if (snapshot.val().designation == "HR") {
        showHrDashboard();
      } else if (snapshot.val().designation == "PM") {
        showPmDashboard();
      }

      $("header").show();
    });
  } catch (e) {
    showHome();
  }
}

function showHrDashboard() {
  $("#view").load("../views/hr/landing.html");
  $("header").show();
}

function showPmDashboard() {
  $("#view").load("../views/pm/landing.html");
  $("header").show();
  pm.showTeamMemeber();
}

function showHome() {
  $("#view").load("../views/home.html");
  $("header").hide();
}

window.onload = function () {
  handleUrl(location.href);

  try {
    var user = firebase.auth().currentUser;
    showDashboard();
  } catch (e) {
    showHome();
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
  dashboard: showDashboard,
  home: showHome
};
"use strict";

var pm = {
  addRequirement: function addRequirement() {// $("#members").append()
  },
  getTeamName: function getTeamName() {
    return firebase.database().ref("employees/".concat(firebase.auth().currentUser.email.split("@")[0])).once("value", function (snapshot) {
      if (snapshot.exists()) {
        return snapshot.val();
      } else return null;
    });
  },
  showTeamMemeber: function showTeamMemeber() {
    this.getTeamName().then(function (pm) {
      firebase.database().ref("accounts/".concat(pm.val().project, "/members")).once("value", function (snapshot) {
        var members = snapshot.val();
        Object.keys(members).map(function (key, idx) {
          var member = "<div class=\"member-container bg-light\"><h4 class=\"name\">".concat(members[key], "</h4></div>");
          $("#members").append(member);
        });
      });
    });
  }
};