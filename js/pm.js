const pm = {
    addRequirement: function(){
        var requirement = $("#addrequirement_skills").val();
        var nor = parseInt($("#addrequirement_nor").val());
        var req = `<div class="member-container bg-light"><p> ${requirement} ${nor}</p></div>`
        $("#team_requirements").append(req);
        this.getTeamName()
        .then(function(pm){
            firebase.database().ref(`requirements/${pm.val().project}/`)
            .once("value", (snapshot)=>{
                var requirements = snapshot.val();
                requirements.total = requirements.total+nor;
                requirements.requirements.push({[requirement]:nor});
                firebase.database().ref(`requirements/${pm.val().project}`)
                .set(requirements);
                $("#req_total").text(` Total requirements: ${requirements.total}`);
                $("#addrequirement .close").trigger("click");
            })
        })
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
                    var member = `<div class="member-container card"><p class="name">${members[key]}</p></div>`
                    $("#members").append(member);
                })
            })
            firebase.database().ref(`requirements/${pm.val().project}/`)
            .once("value", (snapshot)=>{
                var requirements = snapshot.val();
                if(requirements.requirements.length){
                    $("#team_requirements").append(`<h4 class="team-members-title">Requirements</h4>`);
                    $("#team_requirements").append(`<div id="req_total" class="alert alert-primary" role="alert">
                    Total requirements: ${requirements.total}
                  </div>`)
                    requirements.requirements.map(function(requirement){
                        var req = `<div class="member-container bg-light"><p> ${Object.keys(requirement)[0]} ${requirement[Object.keys(requirement)[0]]}</p></div>`
                        $("#team_requirements").append(req);
                    })
                }
            })
        })
    }
}