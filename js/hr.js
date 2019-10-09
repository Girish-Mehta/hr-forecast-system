

const hr = {
    showCandidates:function(){
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
                        <a href="#" class="btn btn-primary">Selected</a>
                        <a href="#" class="btn btn-danger">Rejected</a>
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
    }
}