// Categories for data
let toDo = "toDo";
const goal = "goal"


$(document).ready(function () {  
  updateParentToDo();
  updateFamilyGoals();
});


function addFamilyGoal() {
  var title = $("#goal_title").val();
  var description = $("#goal_description").val();
  var reward = $("#goal_reward").val();

  if(title == "" ) {
    alert("Title is mandatory!");
    clearFamilyGoals(); 
    return 0; 
  } else if (description == "") {
    alert("A Chore needs a description!");
    clearFamilyGoals();
    return 0; 
  } else {

    let item = {
      category: goal,
      id: "Goal" + Date.now(),
      title: title,
      reward: reward,
      desc: description,
      done: false,
    }
    
    // Set session data
    sessionStorage.setItem(item.id, JSON.stringify(item));

    // Create new li element      
    let newList = getGoalCard(item.id, item.title, item.reward, item.desc);

    // Append new li element
    $("#parentFamilyGoalList").append(newList);
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
      done: false,
      accepted: false,
      retry: false,
    }

    // Set session data
    sessionStorage.setItem(item.id, JSON.stringify(item));

    // Make the card  
    let li = getToDoCard(item.id, item.chore, item.score, item.reward, item.due, item.time, item.desc, "");

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


function acceptChore(id) {
  // Get and set session data
  let item = JSON.parse(sessionStorage.getItem(id));
  item.accepted = true;
  sessionStorage.setItem(id, JSON.stringify(item));

  // Update child score.....

  // Reload page
  location.reload();
}


function declineChore(id) {
  // Get and set session data
  let item = JSON.parse(sessionStorage.getItem(id));  
  item.done = false;
  item.retry = true;
  sessionStorage.setItem(id, JSON.stringify(item));

  // Reload page
  location.reload();
}

function updateChore(id) {
  // get Chore
  let item = JSON.parse(sessionStorage.getItem(id));
  
  // set chore information
  $("#txtChore").val(item.chore);
  $("#txtScore").val(item.score);
  $("#txtReward").val(item.reward);
  $("#txtDate").val(item.due);
  $("#txtTime").val(item.time);
  $("#txtDescription").val(item.desc);

  // remove regular function to add chore 
  $("#btnAdd").removeAttr("onclick"); 

  $("#btnAdd").on("click", function(){
    
    // remove the chore that are going to be updated 
    sessionStorage.removeItem(id); 

    // get the changes chore information 
    let item = {
      category: toDo,
      id: "ParentToDo" + Date.now(),
      chore:   $("#txtChore").val(),
      score: $("#txtScore").val(),
      reward: $("#txtReward").val(),
      due: $("#txtDate").val(),
      time: $("#txtTime").val(),
      desc: $("#txtDescription").val(),
      done: false,
      accepted: false,
      retry: false,
    }

    // set updated item in sessionStorage
    sessionStorage.setItem(item.id, JSON.stringify(item)); 

    // Reload page
    location.reload();
  }); 
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

    // Make todo cards
    if(item.category === toDo && item.done == false && item.accepted == false) {

      let Icons = '<span title="update" class="dot" data-toggle="modal" data-target="#choreModal" onclick="updateChore(\''+ item.id + '\')"><span class="glyphicon glyphicon-pencil"></span></span><span title="decline" class="dot" onclick="removeChore(\''+ item.id + '\')"><span class="glyphicon glyphicon-remove"></span> </span>'
      let li = getToDoCard(item.id, item.chore, item.score, item.reward, item.due, item.time, item.desc, Icons);

      $("#tblChores").append(li);
    
    // Make accept cards
    } else if (item.category === toDo && item.done == true && item.accepted == false) {
      
      let acceptIcons = '<span title="accept" class="dot" onclick="acceptChore(\''+ item.id + '\')"> <span class="glyphicon glyphicon-ok"></span></span> <span title="decline" class="dot" onclick="declineChore(\''+ item.id + '\')"><span class="glyphicon glyphicon-remove"></span> </span>';
      let li = getToDoCard(item.id, item.chore, item.score, item.reward, item.due, item.time, item.desc, acceptIcons);
      
      $("#toAcceptTable").append(li);
    } 
  });    
}


// Generates a collapsable todo card
function getToDoCard(id, chore, score, reward, due, time, desc, acceptIcons) {
   
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
    "</div></div></div></div> </li>";

    return li;
  } 

  // Generates a collapsable todo card
function getGoalCard(id, title, reward, desc) {
   
  let listItem = "goalitem" + id;
  
  let li = "<li id='" + listItem + "'> "+
  "<div class='listItemRow'>" + title +
  "<button class='btn btn-primary iconButton glyphicon glyphicon-menu-down' type='button' data-toggle='collapse' data-target='#"+  id + "' aria-expanded='false' aria-controls='"+   id + "'></i></button>" +
  "</div> <div class='collapse listItemContent' id='"+ id + "'> <div class='card card-body'> <div class='cardSections'> " + 
  "Reward: " + reward +
  "<br><br>Description: " + desc + "</p>" + 
  "</div></div></div> </li>";

  return li;
}



function updateFamilyGoals(){

  // Get all session data
  let keys = Object.keys(sessionStorage);
  let data = [];
  keys.forEach(key => {
      data.push(JSON.parse(sessionStorage.getItem(key)));
  });

  // Make the cards
  data.forEach(item => {

    // Make the goal cards
    if(item.category === goal && item.done == false) {

      let li = getGoalCard(item.id, item.title, item.reward, item.desc);
      $("#parentFamilyGoalList").append(li);
    } 
  });    
}