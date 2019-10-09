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
      showHome();
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

var hr = {
  showCandidates: function showCandidates() {
    firebase.database().ref("candidates/").once("value", function (snapshot) {
      var candidates = snapshot.val();
      Object.keys(candidates).map(function (candidate) {
        if (candidates[candidate].status === "scheduled") {
          var candidateUI = "<div class=\"col-sm-6 interview_card interview_filter_schd active p-2\">\n                    <div class=\"card\">\n                    <div class=\"card-body\">\n                        <h5 class=\"card-title\">".concat(candidates[candidate].name, "</h5>\n                        <p class=\"card-text\">Skills: ").concat(candidates[candidate].skills.join(","), "</p>\n                        <p class=\"card-text text-secondary\">Interview at: ").concat(candidates[candidate].interviewDate, "</p>\n                        <a href=\"#\" class=\"btn btn-primary\">Selected</a>\n                        <a href=\"#\" class=\"btn btn-danger\">Rejected</a>\n                    </div>\n                    </div>\n                </div>");
        } else if (candidates[candidate].status === "selected") {
          var candidateUI = "<div class=\"col-sm-6 interview_card interview_filter_selected p-2\">\n                    <div class=\"card\">\n                        <div class=\"card-body\">\n                            <h5 class=\"card-title\">".concat(candidates[candidate].name, "</h5>\n                            <p class=\"card-text\">Skills: ").concat(candidates[candidate].skills.join(","), "</p>\n                            <p class=\"card-text\">Status: <span class=\"text-success\">Selected</span></p>\n                        </div>\n                    </div>\n                </div>");
        } else {
          var candidateUI = "<div class=\"col-sm-6 interview_card interview_filter_rejected p-2\">\n                    <div class=\"card\">\n                        <div class=\"card-body\">\n                            <h5 class=\"card-title\">".concat(candidates[candidate].name, "</h5>\n                            <p class=\"card-text\">Skills: ").concat(candidates[candidate].skills.join(","), "</p>\n                            <p class=\"card-text\">Status: <span class=\"text-danger\">Rejected</span></p>\n                        </div>\n                    </div>\n                </div>");
        }

        $("#interview_candidates").append(candidateUI);
      });
    });
  },
  handleCardShow: function handleCardShow(event) {
    $("#interview_filter").find("a").removeClass("active");
    $(".interview_card").removeClass("active");
    $("#".concat(event.target.id)).addClass("active");
    $(".".concat(event.target.id)).addClass("active");
  }
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
firebase.auth().onAuthStateChanged(function (user) {
  if (user) {
    if (!user.email.split("@")[1] == "publicisgroupe.net") {
      auth.logout();
    }

    $("#login").hide();
    $("#myprofile, #logout").show();
    localStorage.setItem(config.isloggedin, "true");
    $("#myprofile .user-name").text(user.displayName);
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
  hr.showCandidates();
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

function showInterviews() {
  firebase.database().ref('/employees/' + userId).once('value').then(function (snapshot) {
    $("#interviewsContainer").load("../views/hr/interviews.html");
  });
}

var urlRedirect = {
  login: auth.showLogin,
  dashboard: showDashboard,
  home: showHome
};
"use strict";

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var pm = {
  addRequirement: function addRequirement() {
    var requirement = $("#addrequirement_skills").val();
    var nor = parseInt($("#addrequirement_nor").val());
    var req = "<div class=\"member-container bg-light\"><p> ".concat(requirement, " ").concat(nor, "</p></div>");
    $("#team_requirements").append(req);
    this.getTeamName().then(function (pm) {
      firebase.database().ref("requirements/".concat(pm.val().project, "/")).once("value", function (snapshot) {
        var requirements = snapshot.val();
        requirements.total = requirements.total + nor;
        requirements.requirements.push(_defineProperty({}, requirement, nor));
        firebase.database().ref("requirements/".concat(pm.val().project)).set(requirements);
        $("#req_total").text(" Total requirements: ".concat(requirements.total));
        $("#addrequirement .close").trigger("click");
      });
    });
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
        $("#members").empty();
        Object.keys(members).map(function (key, idx) {
          var member = "<div class=\"member-container\"><i class=\"fa fa-user-circle px-2\" aria-hidden=\"true\"></i><p class=\"name\">".concat(members[key], "</p></div>");
          $("#members").append(member);
          $(".team-members").show();
          $(".team-requirements").hide();
          $(".team-title").removeClass("active");
          $(".team-members-title").addClass("active");
        });
      });
    });
  },
  showRequirements: function showRequirements() {
    this.getTeamName().then(function (pm) {
      firebase.database().ref("requirements/".concat(pm.val().project, "/")).once("value", function (snapshot) {
        var requirements = snapshot.val();

        if (requirements.requirements.length) {
          $("#team_requirements").empty();
          $(".team-requirements #req_total").text(requirements.total);
          requirements.requirements.map(function (requirement) {
            var req = "<div class=\"member-container bg-light\"><p> ".concat(Object.keys(requirement)[0], " ").concat(requirement[Object.keys(requirement)[0]], "</p></div>");
            $("#team_requirements").append(req);
          });
        }

        $(".team-members").hide();
        $(".team-requirements").show();
        $(".team-title").removeClass("active");
        $(".team-requirements-title").addClass("active");
      });
    });
  }
};