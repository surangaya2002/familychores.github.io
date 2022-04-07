$(document).ready(function(){

}); 


function navigateLogin() {
     
    var username = document.getElementById("floatingInput").value;
    var password = document.getElementById("floatingPassword").value;

    if(username == 'parent' && password == 'parent')
    {
      window.location.href = "parentview.html";
    }
    else if(username == 'child' && password == 'child')
    {
      window.location.href = "childview.html";
    }
  }

function addFamilyGoal() {
    var title = document.getElementById("goal_title").value;
    //var description = document.getElementById("goal_description").value; 
    //var reward = document.getElementById("goal_reward").value;  

    // Create new li element 
    var newList = "<li class='list-group-item'>" + title + "</li>"; 
    $(".family_score_list").append(newList); 
}

function addChore() {
  var chore, score, reward, date, time, description;
                chore = $("#txtChore").val();
                score = $("#txtScore").val();
                reward = $("#txtReward").val();
                date = $("#txtDate").val();
                time = $("#txtTime").val();
                description = $("#txtDescription").val();

                if (chore == "") {
                  alert("Chore is required!");
              } else {
                  var table = "<tr><td>" + chore + "</td><td>" + score + "</td><td>" + reward + "</td><td>" + date + "</td><td>" + time + "</td><td>" + description + "</td></tr>";
                  $("#tblChores").append(table);
              }

              clearChores();
}

function clearChores() {
  $("#txtChore").val("");
  $("#txtScore").val("");
  $("#txtReward").val("");
  $("#txtDate").val("");
  $("#txtTime").val("");
  $("#txtDescription").val("");
}