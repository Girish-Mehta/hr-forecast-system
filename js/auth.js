const auth = {
    showLogin: function(){
        var provider = new firebase.auth.OAuthProvider('microsoft.com');
        firebase.auth().signInWithRedirect(provider);
        firebase.auth().getRedirectResult()
            .then(function(result) {
                // User is signed in.
                // IdP data available in result.additionalUserInfo.profile.
                // OAuth access token can also be retrieved:
                // result.credential.accessToken
                console.log("Success: "+JSON.stringify(result));
            })
            .catch(function(error) {
                // Handle error.
                console.log("error"+error);
            });
    }
}