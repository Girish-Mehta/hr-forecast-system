const auth = {
    showLogin: function(){
      if(!firebase.auth().currentUser){
        var provider = new firebase.auth.OAuthProvider('microsoft.com');
        firebase.auth().signInWithPopup(provider)
        .then(function(user) {
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
      }
    }
}