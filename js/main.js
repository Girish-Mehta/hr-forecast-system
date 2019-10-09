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
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        $("#login").hide();
        $("#myprofile, #logout").show();
        localStorage.setItem(config.isloggedin, "true");
        $("#myprofile button").text(user.displayName)
    } else {
        $("#login").show();
        $("#myprofile, #logout").hide();
        localStorage.setItem(config.isloggedin, "false");
    }
  });

function handleShowLogin(){
    auth.showLogin();
}

function handleShowRegister(){
    auth.showRegister();
}

function showDashboard() {
    if(firebase.auth() != null) {
        if(firebase.auth().currentUser.email == "vissans@publicisgroupe.net") {
            // HR user
            $("#view").load("../views/hr/landing");
        } else if(firebase.auth().currentUser.email == "girmehta@publicisgroupe.net"){
            $("#view").load("../views/account/landing");
        }
    }
}

function showHrDashboard() {
    $("#view").load("../views/hr/landing.html");
}

function showPmDashboard() {
    $("#view").load("../views/pm/landing.html");    
}

window.onload = function () {  
    handleUrl(location.href);
}


function handleUrl(url) {
    var params = getUrlParams(url)
    if (Object.keys(params).length == 0) {
        var urlParts = url.split("/");
        var navigate = urlParts.pop()
        var urlToOpen = urlRedirect[navigate]
    }
    else {
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
    dashboard: showDashboard
}

