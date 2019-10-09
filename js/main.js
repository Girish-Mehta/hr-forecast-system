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

function handleShowLogin(){
    auth.showLogin();
}

function handleShowRegister(){
    auth.showRegister();
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
        if(url.includes("template")){
            urlRedirect["userCv"](urlParts[urlParts.length-1],navigate);
        }     
        else if (urlRedirect[navigate]) {
            urlToOpen()
        } else {
            urlRedirect.landing();
        }
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
    register: auth.showRegister
}

