"use strict";var auth={showLogin:function(){if(!firebase.auth().currentUser){var e=new firebase.auth.OAuthProvider("microsoft.com");firebase.auth().signInWithPopup(e).then(function(e){}).catch(function(e){console.log("error"+e)})}},logout:function(){"true"===localStorage.getItem(config.isloggedin)&&firebase.auth().signOut()}},config={mainView:"#view",isloggedin:"isloggedin"},endpoints={},firebaseConfig={apiKey:"AIzaSyDL-vEobMb_AeJ6NcEwqWzops9I9C0pR0w",authDomain:"hrforecastsystem.firebaseapp.com",databaseURL:"https://hrforecastsystem.firebaseio.com",projectId:"hrforecastsystem",storageBucket:"",messagingSenderId:"645473796645",appId:"1:645473796645:web:a3539d18ce83b3a73735cc",measurementId:"G-Y7RKP3CTBQ"};function handleShowLogin(){auth.showLogin()}function handleShowRegister(){auth.showRegister()}function showDashboard(){null!=firebase.auth()&&("vissans@publicisgroupe.net"==firebase.auth().currentUser.email?$("#view").load("../views/hr/landing"):"girmehta@publicisgroupe.net"==firebase.auth().currentUser.email&&$("#view").load("../views/account/landing"))}function showHrDashboard(){$("#view").load("../views/hr/landing.html")}function showPmDashboard(){$("#view").load("../views/pm/landing.html")}function handleUrl(e){var i=getUrlParams(e);if(0==Object.keys(i).length){var o=e.split("/").pop();urlRedirect[o]}else urlRedirect[i.mode](i.oobCode)}function getUrlParams(e){var i={};e.replace(/[?&]+([^=&]+)=([^&]*)/gi,function(e,o,a){i[o]=a});return i}firebase.initializeApp(firebaseConfig),firebase.auth().onAuthStateChanged(function(e){e?($("#login").hide(),$("#myprofile, #logout").show(),localStorage.setItem(config.isloggedin,"true"),$("#myprofile button").text(e.displayName)):($("#login").show(),$("#myprofile, #logout").hide(),localStorage.setItem(config.isloggedin,"false"))}),window.onload=function(){handleUrl(location.href)};var urlRedirect={login:auth.showLogin,dashboard:showDashboard};