

const hr = {
    showCandidates:function(){
        $("#interview_candidates").empty();
        firebase.database().ref(`candidates/`)
        .once("value", (snapshot)=>{
            var candidates = snapshot.val();
            Object.keys(candidates).map(function(candidate){
                if(candidates[candidate].status === "scheduled"){
                    var candidateUI = `<div class="col-sm-6 interview_card interview_filter_schd active p-2">
                    <div class="card">
                    <div class="card-body">
                        <h5 class="card-title">${candidates[candidate].name}</h5>
                        <p class="card-text">Skills: ${candidates[candidate].skills.join(",")}</p>
                        <p class="card-text text-secondary">Interview at: ${candidates[candidate].interviewDate}</p>
                        <a href="javascript:void(0)" onclick="hr.selectCandidate(${candidate})" class="btn btn-primary">Selected</a>
                        <a href="javascript:void(0)" onclick="hr.rejectCandidate(${candidate})" class="btn btn-danger">Rejected</a>
                    </div>
                    </div>
                </div>`
                }
                else if(candidates[candidate].status === "selected"){
                    var candidateUI = `<div class="col-sm-6 interview_card interview_filter_selected p-2">
                    <div class="card">
                        <div class="card-body">
                            <h5 class="card-title">${candidates[candidate].name}</h5>
                            <p class="card-text">Skills: ${candidates[candidate].skills.join(",")}</p>
                            <p class="card-text">Status: <span class="text-success">Selected</span></p>
                        </div>
                    </div>
                </div>`
                }
                else{
                    var candidateUI = `<div class="col-sm-6 interview_card interview_filter_rejected p-2">
                    <div class="card">
                        <div class="card-body">
                            <h5 class="card-title">${candidates[candidate].name}</h5>
                            <p class="card-text">Skills: ${candidates[candidate].skills.join(",")}</p>
                            <p class="card-text">Status: <span class="text-danger">Rejected</span></p>
                        </div>
                    </div>
                </div>`
                }
                $("#interview_candidates").append(candidateUI);
            })
        })
    },
    handleCardShow: function(event){
        $("#interview_filter").find("a").removeClass("active");
        $(".interview_card").removeClass("active");
        $(`#${event.target.id}`).addClass("active");
        $(`.${event.target.id}`).addClass("active");
    },
    showAccounts: function(){
        firebase.database().ref('accounts/')
        .once("value",(snapshot)=>{
            var accounts = snapshot.val();
            Object.keys(accounts).map(function(account,index){
                firebase.database().ref(`requirements/${account}`)
                .once("value",(snapshot)=>{
                    var accountRequirement = snapshot.val();
                    var accountName = accounts[account].name;
                    if(accountRequirement !== null){
                        var accountUI = 
                        `<div class="col-sm-12 account_card p-2" onclick="hr.selectAccount(${index})">
                            <div class="card">
                                <div class="card-body">
                                    <h5 class="card-title">${accountName}</h5>
                                    <p class="card-text">Requirement Total: ${accountRequirement['total']}</p>
                                </div>
                            </div>
                        </div>`

                        if(index == 0){
                            var requirementList = `<h6>Requirement Details</h6>`;
                            accountRequirement.requirements.map(function(requirement){
                         requirementList = requirementList+`<div class="member-container bg-light"><p> ${Object.keys(requirement)[0]} ${requirement[Object.keys(requirement)[0]]}</p></div>`
                            })
                        //    for(let i =0; i<accountRequirement.requirements.length; i++){
                        //        requirementList = requirementList + `<div>${accountRequirement.requirements[i]} : 1</div>`;
                        //    }
                        }
                    }else{ 
                        var accountUI = 
                        `<div class="col-sm-12 account_card p-2" onclick="hr.selectAccount(${index})">
                            <div class="card">
                                <div class="card-body">
                                <h5 class="card-title">${accountName}</h5>
                                <p class="card-text">Requirement Total: 0</p>
                                </div>
                            </div>
                        </div>`
                        if(index == 0){
                            var requirementList = `<h6>Requirement Details</h6><div>Currently there is no requirement</div>`;
                        }
                    }
                    $("#account_list").append(accountUI);
                    $(".account_card:first-child .card").css('background-color','#22a8b8');
                    if(index == 0){
                        $(".requirement-list").append(requirementList);
                    }
                })
            })
        })
    },
    resetAccountContent: function(){
        $("#account_list").html("");
        $(".requirement-list").html("");
    },
    selectAccount: function(index){
        $(".account_card .card").css('background-color','#fff');
        $(`.account_card:nth-child(${index+1}) .card`).css('background-color','#22a8b8');
        $(".requirement-list").html("");
        
        firebase.database().ref('accounts/')
        .once("value",(snapshot)=>{
            var accounts = snapshot.val();
            Object.keys(accounts).map(function(account,currentIndex){
                if(index == currentIndex){
                    firebase.database().ref(`requirements/${account}`)
                    .once("value",(snapshot)=>{
                        var accountRequirement = snapshot.val();
                        var accountName = accounts[account].name;
                        if(accountRequirement !== null){
                          var requirementList = `<h6>Requirement Details</h6>`;
                          accountRequirement.requirements.map(function(requirement){
                         requirementList =requirementList+ `<div class="member-container bg-light"><p> ${Object.keys(requirement)[0]} ${requirement[Object.keys(requirement)[0]]}</p></div>`
                        })
                        //   for(let i =0; i<accountRequirement.requirements.length; i++){
                        //     requirementList = requirementList + `<div>${accountRequirement.requirements[i][Object.keys(accountRequirement.requirements[i])[0]]} : 1</div>`;
                        // }
                        }else{ 
                           var requirementList =`<h6>Requirement Details</h6><div>Currently there is no requirement</div>`;
                        }
                        $(".requirement-list").append(requirementList);
                    })
                }
            })
        })
    },
    addCandidate: function(){
        var cid = new Date().getTime();
        var cData = {
            name: $("#addCandidate-name").val(),
            skills: $("#addCandidate-skills").val().split(","),
            interviewDate: $("#addCandidate-date").val(),
            status: "scheduled",
            createdAt: cid * -1
        }
        firebase.database().ref(`candidates/${cid}`)
        .set(cData);
        var candidateUI = `<div class="col-sm-6 interview_card interview_filter_schd active p-2">
                    <div class="card">
                    <div class="card-body">
                        <h5 class="card-title">${cData.name}</h5>
                        <p class="card-text">Skills: ${cData.skills.join(",")}</p>
                        <p class="card-text text-secondary">Interview at: ${cData.interviewDate}</p>
                        <a href="javascript:void(0)" onclick="hr.selectCandidate(${cid})" class="btn btn-primary">Selected</a>
                        <a href="javascript:void(0)" onclick="hr.rejectCandidate(${cid})" class="btn btn-danger">Rejected</a>
                    </div>
                    </div>
                </div>`
        $("#interview_candidates").prepend(candidateUI);
        $("#addCandidate .close").trigger("click");
    },
    selectCandidate: function(uid){
        firebase.database().ref(`candidates/${uid}/status`)
        .set("selected");
        this.showCandidates();
    },
    rejectCandidate: function(uid){
        firebase.database().ref(`candidates/${uid}/status`)
        .set("rejected");
        this.showCandidates();
    }
}