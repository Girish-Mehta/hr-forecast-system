"use strict";var auth={showLogin:function(){if(!firebase.auth().currentUser){var e=new firebase.auth.OAuthProvider("microsoft.com");firebase.auth().signInWithPopup(e).then(function(e){}).catch(function(e){console.log("error"+e)})}},logout:function(){"true"===localStorage.getItem(config.isloggedin)&&firebase.auth().signOut()}},config={mainView:"#view",isloggedin:"isloggedin"},endpoints={},firebaseConfig={apiKey:"AIzaSyDL-vEobMb_AeJ6NcEwqWzops9I9C0pR0w",authDomain:"hrforecastsystem.firebaseapp.com",databaseURL:"https://hrforecastsystem.firebaseio.com",projectId:"hrforecastsystem",storageBucket:"",messagingSenderId:"645473796645",appId:"1:645473796645:web:a3539d18ce83b3a73735cc",measurementId:"G-Y7RKP3CTBQ"};function handleShowLogin(){auth.showLogin()}function handleShowRegister(){auth.showRegister()}function showDashboard(){try{var e=firebase.auth().currentUser.email.split("@")[0];firebase.database().ref("/employees/"+e).once("value").then(function(e){"HR"==e.val().designation?showHrDashboard():"PM"==e.val().designation&&showPmDashboard(),$("header").show()})}catch(e){showHome()}}function showHrDashboard(){$("#view").load("../views/hr/landing.html"),$("header").show()}function showPmDashboard(){$("#view").load("../views/pm/landing.html"),$("header").show(),pm.showTeamMemeber()}function showHome(){$("#view").load("../views/home.html"),$("header").hide()}function handleUrl(e){var a=getUrlParams(e);if(0==Object.keys(a).length){var o=e.split("/").pop();urlRedirect[o]}else urlRedirect[a.mode](a.oobCode)}function getUrlParams(e){var a={};e.replace(/[?&]+([^=&]+)=([^&]*)/gi,function(e,o,t){a[o]=t});return a}function showInterviews(){firebase.database().ref("/employees/"+userId).once("value").then(function(e){$("#interviewsContainer").load("../views/hr/interviews.html")})}firebase.initializeApp(firebaseConfig),firebase.auth().onAuthStateChanged(function(e){e?($("#login").hide(),$("#myprofile, #logout").show(),localStorage.setItem(config.isloggedin,"true"),$("#myprofile button").text(e.displayName),showDashboard()):($("#login").show(),$("#myprofile, #logout").hide(),localStorage.setItem(config.isloggedin,"false"))}),window.onload=function(){handleUrl(location.href);try{firebase.auth().currentUser;showDashboard()}catch(e){showHome()}};var urlRedirect={login:auth.showLogin,dashboard:showDashboard,home:showHome},pm={addRequirement:function(){},getTeamName:function(){return firebase.database().ref("employees/".concat(firebase.auth().currentUser.email.split("@")[0])).once("value",function(e){return e.exists()?e.val():null})},showTeamMemeber:function(){this.getTeamName().then(function(e){firebase.database().ref("accounts/".concat(e.val().project,"/members")).once("value",function(e){var a=e.val();Object.keys(a).map(function(e,o){var t='<div class="member-container bg-light"><h4 class="name">'.concat(a[e],"</h4></div>");$("#members").append(t)})})})}};