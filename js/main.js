$(document).ready(function () {});

function navigateLogin() {
  var username = document.getElementById("floatingInput").value;
  var password = document.getElementById("floatingPassword").value;

  if (username == "parent" && password == "parent") {
    window.location.href = "parentview.html";
  } else if (username == "child" && password == "child") {
    window.location.href = "childview.html";
  }
}


function addFamilyGoal() {
  var title = $("#goal_title").val();
  var description = $("#goal_description").val();

  //var reward = document.getElementById("goal_reward").value;

  if(title == "" ) {
    alert("Title is mandatory!");
    clearFamilyGoals(); 
    return 0; 
  } else if (description == "") {
    alert("A Chore needs a description!");
    clearFamilyGoals();
    return 0; 
  } else {
      // Create new li element
    var newList = "<li class='list-group-item'>" + title + "</li>";
    $(".family_score_list").append(newList);
  }
}

function removeChore(chore_text) {
  /* in the function onclick the title is chore_text ->
    we check for a row in table with the same title to remove it 
  */
  $('#tblChores tr:contains(' + chore_text + ')').remove();   
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
    var table =
      "<tr><td>" +
      chore +
      "</td><td>" +
      score +
      "</td><td>" +
      reward +
      "</td><td>" +
      date +
      "</td><td>" +
      time +
      "</td><td>" +
      description +
      '<span class="glyphicon glyphicon-remove-circle" onclick="removeChore(\'' + chore + '\')" aria-hidden="true"></span></td></tr>';
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

function clearFamilyGoals() {
  $("#goal_title").val(""); 
  $("#goal_description").val(""); 
  $("#goal_reward").val(""); 
}


function acceptChore(itemId) {
  $(itemId).remove();
  console.log("accept chore");
}

function declineChore(itemId) {
  $(itemId).remove();
  console.log("decline chore");
}
