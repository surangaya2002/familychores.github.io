$(document).ready(function () { });

// function on login.html page 
function navigateLogin() {
  var username = document.getElementById("floatingInput").value;
  var password = document.getElementById("floatingPassword").value;

  if (username == "parent" && password == "parent") {
    window.location.href = "parentview.html";
  } else if (username == "child" && password == "child") {
    window.location.href = "childview.html";
  }
}

// function to add family goal in parenview.html 
function addFamilyGoal() {
  var title = $("#goal_title").val();
  var description = $("#goal_description").val();
  //var reward = document.getElementById("goal_reward").value;

  // Validate input (Right now only null value)
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

// Add chore in the parentview.html
function addChore() {
  if ( $("#txtChore").val() == "") {
    alert("Chore is required!");
    } else {
    
    let itemData = {
      id: "ParentToDo" + Date.now(),
      chore: $("#txtChore").val(),
      score: $("#txtScore").val(),
      reward: $("#txtReward").val(),
      due: $("#txtDate").val(),
      time: $("#txtTime").val(),
      desc: $("#txtDescription").val(),
    }
    let data = [itemData];
  
    // Make the card
    data.forEach(itemData => { 
      let li = "<li id=itemitemo'" + itemData.id + "'> "+
      "<div class='listItemRow'>" + 
      itemData.chore + "<div class='acceptIcons'> <div id='rewardrow"+ itemData.id +"' class='acceptIcons'> " +
      "<button class='btn btn-primary iconButton glyphicon glyphicon-menu-down' type='button' data-toggle='collapse' data-target='#"+  itemData.id + "' aria-expanded='false' aria-controls='"+  itemData.id + "'></i></button>" +
      "</div> </div> </div> <div class='collapse listItemContent' id='"+  itemData.id + "'> <div class='card card-body'> <p> Score: " + 
      itemData.score + " points<br>Reward: " + 
      itemData.reward + "<br><br>Due Date: " + 
      itemData.due + "<br>Time Interval: " + 
      itemData.time + "<br><br>Description: " + 
      itemData.desc + "</p> </div> </div> </li>";
      
      $("#tblChores").append(li);
    });
  }
  clearChores();
}

// Clear values in chores (Help function)
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

// accept and decline chore functions 
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
    itemData.reward + "<br><br>Due Date: " + 
    itemData.due + "<br>Time Interval: " + 
    itemData.time + "<br><br>Description: " + 
    itemData.desc + "</p> </div> </div> </li>";

    //TODO add DONE button

    $("#childToDoList").append(li);
    $("#rewardrow" + itemData.id).prepend(scoreAndRewardSection);      
  });
}
