// Categories for data
let toDo = "toDo";
const toAccept = "toAccept";
const goal = "goal"

// TEMP MOCKDATA
// let itemData1 = {
//   id: "childToDo1",
//   chore: "Take out the garbage",
//   score: 10,
//   reward: "Movie",
//   due: "",
//   time: "",
//   desc: "",
// }
// let itemData2 = {
//   id: "childToDo2",
//   chore: "Remove dishes from dishwasher",
//   score: 15,
//   reward: "",
//   due: "",
//   time: "",
//   desc: "",
// }
// let data = [itemData1, itemData2];


$(document).ready(function () {  
  updateParentToDo();
});


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

function removeChore(id) {
  // Remove from session data
  sessionStorage.removeItem(id);

  // Reload page
  location.reload();
}


function addChore() {
  if ( $("#txtChore").val() == "") {
    alert("Chore is required!");
  
  } else {
  
    // Get user data
    let item = {
      category: toDo,
      id: "ParentToDo" + Date.now(),
      chore:   $("#txtChore").val(),
      score: $("#txtScore").val(),
      reward: $("#txtReward").val(),
      due: $("#txtDate").val(),
      time: $("#txtTime").val(),
      desc: $("#txtDescription").val(),
    }

    // Set session data
    sessionStorage.setItem(item.id, JSON.stringify(item));

    // Make the card  
    let li = getToDoCard(item.id, item.chore, item.score, item.reward, item.due, item.time, item.desc);

    // Append card
    $("#tblChores").append(li);
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


function updateParentToDo() {
    // Get all session data
  let keys = Object.keys(sessionStorage);
  let data = [];
  keys.forEach(key => {
      data.push(JSON.parse(sessionStorage.getItem(key)));
  });

  // Make the cards
  data.forEach(item => {

    // Check if data is a todo item
    if(item.category === toDo) {

    // Set session data
    sessionStorage.setItem(item.id, JSON.stringify(item))
  
    //Make the card
    let li = getToDoCard(item.id, item.chore, item.score, item.reward, item.due, item.time, item.desc);

    // Append card
    $("#tblChores").append(li);
    }
  });    
}


// Generates a collapsable card
function getToDoCard(id, chore, score, reward, due, time, desc, acceptIcons = "") {
   
    let listItem = "itemitemo" + id;
    
    let li = "<li id='" + listItem + "'> "+
    "<div class='listItemRow'>" + 
    chore + "<div class='acceptIcons'> <div class='acceptIcons'> " +
    acceptIcons +
    "<button class='btn btn-primary iconButton glyphicon glyphicon-menu-down' type='button' data-toggle='collapse' data-target='#"+  id + "' aria-expanded='false' aria-controls='"+   id + "'></i></button>" +
    "</div> </div> </div> <div class='collapse listItemContent' id='"+ id + "'> <div class='card card-body'> <div class='cardSections'>  <p> Score: " + 
    score + " <br>Reward: " + 
    reward + "<br><br>Due date: " + 
    due + "<br>Time interval: " + 
    time + "<br><br>Description: " + 
    desc + "</p>" + 
    "<div id='bottomButtons' class='cardButtons'> " + 
    '<span class="glyphicon glyphicon-remove-circle" onclick="removeChore(\''+ id + '\')"/>' + 
    "</div></div></div></div> </li>";

    return li;
  }