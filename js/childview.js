// Categories for data
let toDo = "toDo";
const goal = "goal"


$(document).ready(function () {
      updateScore();
      updateChildToDo();
      updateFamilyGoals();
});


function updateScore() {
const score = 1200; 
// TODO count score...
$("#childScore").html(score);
}
  

// Updates the todo and to approve tables 
function updateChildToDo() {

    // Get all session data
    let keys = Object.keys(sessionStorage);
    let data = [];
    keys.forEach(key => {
        data.push(JSON.parse(sessionStorage.getItem(key)));
    });

    // Make the cards
    data.forEach(item => {

        // Create the icons for score and reward
        let scoreAndRewardSection = "";
        if (item.score != "") {
            scoreAndRewardSection += "<div class='scoreLine'> <div class='coinLayer1'> <div class='coinLayer2'> <p class='coinText'>"+ item.score +"</p> </div> </div></div>";
        }
        if (item.reward != "") {
            scoreAndRewardSection += "<span class='glyphicon glyphicon-gift dot'></span>"; 
        }

        // if a declined todo
        if (item.category === toDo && item.done == false &&item.retry === true){

            let style = " style='background: rgba(240, 38, 38, 0.4)'";
            let li = getToDoCardChild(item, scoreAndRewardSection, true, style);
            
            $("#childToDoList").append(li); 

        // if a todo
        } else if(item.category === toDo && item.done === false) {

            let li = getToDoCardChild(item, scoreAndRewardSection, true, '');

            $("#childToDoList").append(li);   
        
        // if a to approve
        } else if (item.category === toDo && item.done === true && item.accepted === false){

            let style = " style='background: var(--acceptColor);'";
            let li = getToDoCardChild(item, scoreAndRewardSection, false, style);

            $("#childToBeApprovedList").append(li); 
        } 
    });
}


function markChoreAsDone(id){
  // Get the session data via key
  let item = JSON.parse(sessionStorage.getItem(id));

  // Set chore as done
  item.done = true;
  sessionStorage.setItem(id, JSON.stringify(item));

  // Reload page
  location.reload();
}


// Generates a collapsable card
function getToDoCardChild(item, rewardIcons, showDoneButton, style) {

    // Create a "done" button if needed
    let doneButton = '';
    if (showDoneButton) {
        doneButton = '<button class="btr btr-info smallRoundButton" onclick="markChoreAsDone(\''+ item.id + '\')">Done</button>';
    }

    let listItem = "itemChildTodo" + item.id;

    let li = "<li id=item'" + listItem + style + "'> "+
    "<div class='listItemRow'>" + 
    item.chore + "<div class='acceptIcons'> <div class='acceptIcons'> " + rewardIcons + 
    "<button class='btn btn-primary iconButton glyphicon glyphicon-menu-down' type='button' data-toggle='collapse' data-target='#"+  item.id + "' aria-expanded='false' aria-controls='"+  item.id + "'></i></button>" +
    "</div> </div> </div> <div class='collapse listItemContent' id='"+  item.id + "'> <div class='card card-body'> <p> Score: " + 
    item.score + " <br>Reward: " + 
    item.reward + "<br><br>Due date: " + 
    item.due + "<br>Time interval: " + 
    item.time + "<br><br>Description: " + 
    item.desc + "</p> <div id='bottomButtons' class='cardButtons'> " + doneButton + "</div></div> </div> </li>";

    return li;
  }

  
// Generates a collapsable goal card
function getGoalCard(id, title, reward, desc) {
   
    let listItem = "goalitem" + id;

    let rewardSection = "";
    if (reward != "") {
        rewardSection += "<span class='glyphicon glyphicon-gift dot'></span>"; 
    }
    
    let li = "<li id='" + listItem + "'> "+
    "<div class='listItemRow'>" + title + "<div class='acceptIcons'> <div class='acceptIcons'> " + rewardSection + 
    "<button class='btn btn-primary iconButton glyphicon glyphicon-menu-down' type='button' data-toggle='collapse' data-target='#"+  id + "' aria-expanded='false' aria-controls='"+   id + "'></i></button>" +
    "</div></div></div> <div class='collapse listItemContent' id='"+ id + "'> <div class='card card-body'> <div class='cardSections'> " + 
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
      $("#childFamilyGoals").append(li);
    } 
  });    
}