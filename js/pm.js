const pm = {
    addRequirement: function(){

        
        // $("#members").append()
    },
    getTeamName : function(){
        return firebase.database().ref(`employees/${firebase.auth().currentUser.email.split("@")[0]}`)
        .once("value",(snapshot)=>{
            if(snapshot.exists()){
                return snapshot.val()
            }    
            else
                return null;
        })
    },
    showTeamMemeber: function(){
        this.getTeamName()
        .then(function(pm){
            firebase.database().ref(`accounts/${pm.val().project}/members`)
            .once("value", (snapshot)=>{
                var members = snapshot.val()
                Object.keys(members).map(function(key, idx){
                    var member = `<div class="member-container bg-light"><h4 class="name">${members[key]}</h4></div>`
                    $("#members").append(member);
                })
            })
            // firebase.database().ref(`requirements/${pm.val().project}/`)
            // .once("value", (snapshot)=>{
            //     var members = snapshot.val()
            //     Object.keys(members).map(function(key, idx){
            //         var member = `<div class="member-container bg-light"><h4 class="name">${members[key]}</h4></div>`
            //         $("#members").append(member);
            //     })
            // })
        })
    }
}