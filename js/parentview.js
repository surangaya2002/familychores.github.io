// Categories for data
let toDo = "toDo";
const scoreGoal = "scoreGoal";
const choreGoal = "choreGoal";


$(document).ready(function () {  
  updateParentToDo();
  updateFamilyGoals();
  updateCheckboxItems();
});


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
    // Reload page
    location.reload();
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
  $("#goal_title_score").val(""); 
  $("#goal_description_score").val(""); 
  $("#goal_reward_score").val(""); 
  
  $("#goal_title_chore").val(""); 
  $("#goal_description_chore").val(""); 
  $("#goal_reward_chore").val(""); 
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

  $("#btnDecline").on("click", function(){

    // Get and set session data
    let item = JSON.parse(sessionStorage.getItem(id));  
    item.done = false;
    item.retry = true;
    item.declineDesc = $("#declinedesc").val();  
    sessionStorage.setItem(id, JSON.stringify(item));

    // Reload page
    location.reload();

  }); 
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

      let Icons = '<span title="Edit" class="dot" data-toggle="modal" data-target="#choreModal" onclick="updateChore(\''+ item.id + '\')"><span class="glyphicon glyphicon-pencil"></span></span><span title="Delete" class="dot" onclick="removeChore(\''+ item.id + '\')"><span class="glyphicon glyphicon-trash"></span> </span>'
      let li = getToDoCard(item.id, item.chore, item.score, item.reward, item.due, item.time, item.desc, Icons);

      $("#tblChores").append(li);
    
    // Make accept cards
    } else if (item.category === toDo && item.done == true && item.accepted == false) {
      
      let acceptIcons = '<span title="Accept" class="dot" onclick="acceptChore(\''+ item.id + '\')"> <span class="glyphicon glyphicon-ok"></span></span> <span data-toggle="modal" data-target="#declineDescModal" title="Decline" class="dot" onclick="declineChore(\''+ item.id + '\')"><span class="glyphicon glyphicon-remove"></span> </span>';
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

// Generates a collapsable chore goal card
function getChoreGoalCard(item) {

  // List sub chores for goal
  let subChores = "";
  item.chores.forEach(subChore => {
    let i = JSON.parse(sessionStorage.getItem(subChore));
    if (i != null) {
      subChores = subChores + "<br>- " + i.chore; 
    }
  });

  let listItem = "goalitem" + item.id;
  
  let li = "<li id='" + listItem + "'> "+
  "<div class='listItemRow'>" + item.title +
  "<button class='btn btn-primary iconButton glyphicon glyphicon-menu-down' type='button' data-toggle='collapse' data-target='#"+ item.id + "' aria-expanded='false' aria-controls='"+ item.id + "'></i></button>" +
  "</div> <div class='collapse listItemContent' id='"+ item.id + "'> <div class='card card-body'> <div class='cardSections'> " + 
  "Reward: " + item.reward +
  "<br> <br> Description: " + item.desc + 
  "<br> <br> Chores to complete:" + subChores + " </p>" +
  "</div></div></div> </li>";
  
  return li;
}

  function getScoreGoalCard(item) {
   
    let listItem = "scoreGoalItem" + item.id;
    
    let li = "<li id='" + listItem + "'> "+
    "<div class='listItemRow'>" + item.title +
    "<button class='btn btn-primary iconButton glyphicon glyphicon-menu-down' type='button' data-toggle='collapse' data-target='#"+  item.id + "' aria-expanded='false' aria-controls='"+ item.id + "'></i></button>" +
    "</div> <div class='collapse listItemContent' id='"+ item.id + "'> <div class='card card-body'> <div class='cardSections'> " + 
    "Reward: " + item.reward +
    "<br><br>Description: " + item.desc + " </p>" + 
    "</div></div></div> </li>";
  
    return li;
  }
  
  
  function updateFamilyGoals() {
  
    // Get all session data
    let keys = Object.keys(sessionStorage);
    let data = [];
    keys.forEach(key => {
        data.push(JSON.parse(sessionStorage.getItem(key)));
    });
  
    // Make the goal cards
    data.forEach(item => {
      if (item.category === choreGoal && item.done == false) {
        
        // Check and handle if sub-chores for the goal have been removed
        let noOfSubChores = 0; 
        item.chores.forEach(subChore => {
          if (JSON.parse(sessionStorage.getItem(subChore)) != null) {
            noOfSubChores++; 
          }
        });
        if (noOfSubChores === 0) {
          sessionStorage.removeItem(item.id);
          location.reload();
        }
  
        let li = getChoreGoalCard(item);
        $("#parentFamilyGoalList").append(li);  
      
      } else if (item.category === scoreGoal && item.done == false) {
        let li = getScoreGoalCard(item);
        $("#parentFamilyGoalList").append(li);  
      }
    });    
  }
  
  
  function addScoreGoal(){
    
    var title = $("#goal_title_score").val();
    var description = $("#goal_description_score").val();
    var reward = $("#goal_reward_score").val();
  
    if(checkMandatoryGoalFields(title, description)) {
  
      // Check so score is greater than 0
      if ( title <= 0 ) {
        alert("Points need to be grater than 0");
        clearFamilyGoals();
        return 0; 
      }
  
      let item = {
        category: scoreGoal,
        id: "ScoreGoal" + Date.now(),
        title: "Have " + title + " points",
        points: title,
        reward: reward,
        desc: description,
        done: false,
      }
  
      // Set session data
      sessionStorage.setItem(item.id, JSON.stringify(item));
      // Reload page
      location.reload();
    }
  }
  
  
  function addChoreGoal(){
  
    var title = $("#goal_title_chore").val();
    var description = $("#goal_description_chore").val();
    var reward = $("#goal_reward_chore").val();
  
    if(checkMandatoryGoalFields(title, description)) {
  
      // Get selected chores
      let checkboxes = document.querySelectorAll('input[name="fam_goal_chore"]:checked');
      let selectedChores = [];
      checkboxes.forEach((checkbox) => {
        selectedChores.push(checkbox.id);
      });
  
      // Check so chores are selected
      if (selectedChores.length === 0){
        alert("You need to select at least one chore!");
        clearFamilyGoals();
        return 0; 
      }
      
      let item = {
        category: choreGoal,
        id: "ChoreGoal" + Date.now(),
        title: title,
        reward: reward,
        desc: description,
        done: false,
        chores: selectedChores,
      }
  
      // Set session data
      sessionStorage.setItem(item.id, JSON.stringify(item));
      // Reload page
      location.reload();
    }
  }
  
  
  function updateCheckboxItems() {
    // Get all session data
    let keys = Object.keys(sessionStorage);
    let data = [];
    keys.forEach(key => {
        data.push(JSON.parse(sessionStorage.getItem(key)));
    });
  
    // Add chores as checkbox items
    data.forEach(item => {
      if(item.category === toDo && item.done == false) {
  
        let cb = '<div class="goal_chore">  <input type="checkbox" id="'+ item.id +'" name="fam_goal_chore"> <label for="'+ item.id +'">'+ item.chore +'</label> </div>';
        $("#goal_chores_list").append(cb);
      } 
    }); 
  }
  
  
  function checkMandatoryGoalFields(title, description) {
    
    if(title == "" || description == "") {
      alert("You need to fill out the mandatory fields marked with *");
      clearFamilyGoals(); 
      return false; 
    } 
    return true;
  }