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