const auth = {
    showLogin: function(){
      if(!firebase.auth().currentUser){
        var provider = new firebase.auth.OAuthProvider('microsoft.com');
        firebase.auth().signInWithPopup(provider)
        .then(function(result) {
          $("#login").hide();
          $("#myprofile, #logout").show();
          localStorage.setItem(config.isloggedin, "true");
          console.log("Success: "+result);
        })
        .catch(function(error) {
          // Handle error.
          console.log("error"+error);
        }); 
      }     
    },
    logout: function(){
      if(localStorage.getItem(config.isloggedin) === "true"){
        firebase.auth().signOut();
        localStorage.setItem(config.isloggedin, "false");
        $("#login").show();
        $("#myprofile, #logout").hide();
      }
    }
}