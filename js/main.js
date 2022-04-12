$(document).ready(function () {
  updateScore();
  updateChildToDo();
});

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


// Update data 
function updateScore() {
  const score = 1200; 
  // TODO count score...
  $("#childScore").html(score);
}

function updateChildToDo() {
  //temp mockdata (next step iterate lokal storage)
  let itemData1 = {
    id: "childToDo1",
    chore: "Take out the garbage",
    score: 10,
    reward: "Movie",
    due: "",
    time: "",
    desc: "",
  }
  let itemData2 = {
    id: "childToDo2",
    chore: "Remove dishes from dishwasher",
    score: 15,
    reward: "",
    due: "",
    time: "",
    desc: "",
  }
  let data = [itemData1, itemData2];

  // Make the cards
  data.forEach(itemData => {

    let scoreAndRewardSection = "";
    if (itemData.score != "") {
      scoreAndRewardSection += "<div class='scoreLine'> <div class='coinLayer1'> <div class='coinLayer2'> <p class='coinText'>"+ itemData.score +"</p> </div> </div></div>";
    }
    if (itemData.reward != "") {
      scoreAndRewardSection += "<span class='glyphicon glyphicon-gift dot'></span>"; 
    }

    let li = "<li id=item'" + itemData.id + "'> "+
    "<div class='listItemRow'>" + 
    itemData.chore + "<div class='acceptIcons'> <div id='rewardrow"+ itemData.id +"' class='acceptIcons'> " +
    "<button class='btn btn-primary iconButton glyphicon glyphicon-menu-down' type='button' data-toggle='collapse' data-target='#"+  itemData.id + "' aria-expanded='false' aria-controls='"+  itemData.id + "'></i></button>" +
    "</div> </div> </div> <div class='collapse listItemContent' id='"+  itemData.id + "'> <div class='card card-body'> <p> Score: " + 
    itemData.score + " points<br>Reward: " + 
    itemData.reward + "<br><br>Due date: " + 
    itemData.due + "<br>Time interval: " + 
    itemData.time + "<br><br>Description: " + 
    itemData.desc + "</p> </div> </div> </li>";

    //TODO add DONE button

    $("#childToDoList").append(li);
    $("#rewardrow" + itemData.id).prepend(scoreAndRewardSection);      
  });




}