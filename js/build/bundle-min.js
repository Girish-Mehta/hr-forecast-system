"use strict";var auth={showLogin:function(){if(!firebase.auth().currentUser){var e=new firebase.auth.OAuthProvider("microsoft.com");firebase.auth().signInWithPopup(e).then(function(e){}).catch(function(e){console.log("error"+e)})}},logout:function(){"true"===localStorage.getItem(config.isloggedin)&&(firebase.auth().signOut(),showHome())}},config={mainView:"#view",isloggedin:"isloggedin"},endpoints={},firebaseConfig={apiKey:"AIzaSyDL-vEobMb_AeJ6NcEwqWzops9I9C0pR0w",authDomain:"hrforecastsystem.firebaseapp.com",databaseURL:"https://hrforecastsystem.firebaseio.com",projectId:"hrforecastsystem",storageBucket:"",messagingSenderId:"645473796645",appId:"1:645473796645:web:a3539d18ce83b3a73735cc",measurementId:"G-Y7RKP3CTBQ"};function handleShowLogin(){auth.showLogin()}function handleShowRegister(){auth.showRegister()}function showDashboard(){try{var e=firebase.auth().currentUser.email.split("@")[0];firebase.database().ref("/employees/"+e).once("value").then(function(e){"HR"==e.val().designation?showHrDashboard():"PM"==e.val().designation&&showPmDashboard(),$("header").show()})}catch(e){showHome()}}function showHrDashboard(){$("#view").load("../views/hr/landing.html"),$("header").show()}function showPmDashboard(){$("#view").load("../views/pm/landing.html"),$("header").show(),pm.showTeamMemeber()}function showHome(){$("#view").load("../views/home.html"),$("header").hide()}function handleUrl(e){var a=getUrlParams(e);if(0==Object.keys(a).length){var t=e.split("/").pop();urlRedirect[t]}else urlRedirect[a.mode](a.oobCode)}function getUrlParams(e){var a={};e.replace(/[?&]+([^=&]+)=([^&]*)/gi,function(e,t,o){a[t]=o});return a}function showInterviews(){firebase.database().ref("/employees/"+userId).once("value").then(function(e){$("#interviewsContainer").load("../views/hr/interviews.html")})}firebase.initializeApp(firebaseConfig),firebase.auth().onAuthStateChanged(function(e){e?("publicisgroupe.net"==!e.email.split("@")[1]&&auth.logout(),$("#login").hide(),$("#myprofile, #logout").show(),localStorage.setItem(config.isloggedin,"true"),$("#myprofile button").text(e.displayName),showDashboard()):($("#login").show(),$("#myprofile, #logout").hide(),localStorage.setItem(config.isloggedin,"false"))}),window.onload=function(){handleUrl(location.href);try{firebase.auth().currentUser;showDashboard()}catch(e){showHome()}};var urlRedirect={login:auth.showLogin,dashboard:showDashboard,home:showHome},pm={addRequirement:function(){$("#addrequirement_skills").val(),$("#addrequirement_nor").val();this.getTeamName().then(function(e){})},getTeamName:function(){return firebase.database().ref("employees/".concat(firebase.auth().currentUser.email.split("@")[0])).once("value",function(e){return e.exists()?e.val():null})},showTeamMemeber:function(){this.getTeamName().then(function(e){firebase.database().ref("accounts/".concat(e.val().project,"/members")).once("value",function(e){var a=e.val();Object.keys(a).map(function(e,t){var o='<div class="member-container card"><p class="name">'.concat(a[e],"</p></div>");$("#members").append(o)})}),firebase.database().ref("requirements/".concat(e.val().project,"/")).on("value",function(e){var a=e.val();a.requirements.length&&($("#team_requirements").append('<h4 class="team-members-title">Requirements</h4>'),$("#team_requirements").append('<div class="alert alert-primary" role="alert">\n                    Total requirements: '.concat(a.total,"\n                  </div>")),a.requirements.map(function(e){var a='<div class="member-container bg-light"><p> '.concat(Object.keys(e)[0]," ").concat(e[Object.keys(e)[0]],"</p></div>");$("#team_requirements").append(a)}))})})}};