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
    let itemData = {
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
    sessionStorage.setItem(itemData.id, JSON.stringify(itemData));

    // Make the card  
    let listItem = "itemitemo" + itemData.id;  
    let li = "<li id='" + listItem + "'> "+
    "<div class='listItemRow'>" + 
    itemData.chore + "<div class='acceptIcons'> <div class='acceptIcons'> " +
    "<button class='btn btn-primary iconButton glyphicon glyphicon-menu-down' type='button' data-toggle='collapse' data-target='#"+   itemData.id + "' aria-expanded='false' aria-controls='"+   itemData.id + "'></i></button>" +
    "</div> </div> </div> <div class='collapse listItemContent' id='"+   itemData.id + "'> <div class='card card-body'> <div class='cardSections'>  <p> Score: " + 
    itemData.score + " <br>Reward: " + 
    itemData.reward + "<br><br>Due date: " + 
    itemData.due + "<br>Time interval: " + 
    itemData.time + "<br><br>Description: " + 
    itemData.desc + "</p>" + 
    "<div class='cardButtons'> "+ 
    '<span class="glyphicon glyphicon-remove-circle" onclick="removeChore(\''+ itemData.id + '\')"/>' +
    "</div></div></div></div> </li>";

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
  data.forEach(itemData => {

    // Check if data is a todo item
    if(itemData.category === toDo) {

    // Set session data
    sessionStorage.setItem(itemData.id, JSON.stringify(itemData))
  
    // Make the card    
    let listItem = "itemitemo" + itemData.id;
    let li = "<li id='" + listItem + "'> "+
    "<div class='listItemRow'>" + 
    itemData.chore + "<div class='acceptIcons'> <div class='acceptIcons'> " +
    "<button class='btn btn-primary iconButton glyphicon glyphicon-menu-down' type='button' data-toggle='collapse' data-target='#"+   itemData.id + "' aria-expanded='false' aria-controls='"+   itemData.id + "'></i></button>" +
    "</div> </div> </div> <div class='collapse listItemContent' id='"+   itemData.id + "'> <div class='card card-body'> <div class='cardSections'>  <p> Score: " + 
    itemData.score + " <br>Reward: " + 
    itemData.reward + "<br><br>Due date: " + 
    itemData.due + "<br>Time interval: " + 
    itemData.time + "<br><br>Description: " + 
    itemData.desc + "</p>" + 
    "<div class='cardButtons'> "+ 
    '<span class="glyphicon glyphicon-remove-circle" onclick="removeChore(\''+ itemData.id + '\')"/>' +
    "</div></div></div></div> </li>";

    // Append card
    $("#tblChores").append(li);
    }
  });    
}
