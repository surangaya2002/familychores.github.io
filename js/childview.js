// Categories for data
let toDo = "toDo";
const scoreGoal = "scoreGoal";
const choreGoal = "choreGoal";

// Default/start score
let score = 1200; 


$(document).ready(function () {
      updateScore();
      updateChildToDo();
      updateFamilyGoals();
});


function updateScore() {
   // Get all session data
   let keys = Object.keys(sessionStorage);
   let data = [];
   keys.forEach(key => {
       data.push(JSON.parse(sessionStorage.getItem(key)));
   });

   data.forEach(item => {
    // Sum score on all todo:s that are accepted
    if (item.category === toDo && item.accepted == true ){ 
    if (parseInt(item.score)){
      score = score + parseInt(item.score);
    }   
    } 
   });

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

        // if a declined todo
        if (item.category === toDo && item.done == false && item.retry === true){

            let style = " style='background: rgba(240, 38, 38, 0.4)'";
            let li = getToDoCardChild(item, true, style, true);
            
            $("#childToDoList").append(li); 

        // if a todo
        } else if(item.category === toDo && item.done === false) {

            let li = getToDoCardChild(item, true, '');

            $("#childToDoList").append(li);   
        
        // if a to approve
        } else if (item.category === toDo && item.done === true && item.accepted === false){

            let style = " style='background: var(--acceptColor);'";
            let li = getToDoCardChild(item, false, style);

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
function getToDoCardChild(item, showDoneButton, style, decline=false) {

    // Create the icons for score and reward
    let rewardIcons = "";
    if (item.score != "") {
      rewardIcons += "<div class='scoreLine'> <div class='coinLayer1'> <div class='coinLayer2'> <p class='coinText'>"+ item.score +"</p> </div> </div></div>";
    }
    if (item.reward != "") {
      rewardIcons += "<span class='glyphicon glyphicon-gift dot'></span>"; 
    }

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
    item.desc; 
    
    // if chore was decline by parent, add an decline description
    if(decline) {
      li += "<br><br>Why it failed: " + item.declineDesc + "</p>";
    } else{
      li += "</p>"; 
    }

    li += "<div id='bottomButtons' class='cardButtons'> " + doneButton + "</div></div> </div> </li>";

    return li;
  }

  
  function updateFamilyGoals(){
    // Get all session data
    let keys = Object.keys(sessionStorage);
    let data = [];
    keys.forEach(key => {
        data.push(JSON.parse(sessionStorage.getItem(key)));
    });
  
    // Make the goal cards
    data.forEach(item => {
  
      // if a chore goal card
      if (item.category === choreGoal && !item.done) {
  
        // Get progress
        let noOfChoresDone = 0;
        let noOfChores = 0; 
        item.chores.forEach(subChore => {
          let s = JSON.parse(sessionStorage.getItem(subChore));
          if (s != null) {
            noOfChores++;
            if(s.accepted){
              noOfChoresDone++;
            }
          }
        });
        
        let li = getChoreGoalCard(item, noOfChoresDone/noOfChores);
        $("#childFamilyGoals").append(li);  
      
      // if a score goal card
      } else if (item.category === scoreGoal && !item.done) {
  
        // Get progress
        let progress = score/item.points;
        if(progress > 1){
          progress = 1;
        }
  
        let li = getScoreGoalCard(item,  progress);
        $("#childFamilyGoals").append(li);  
      }
    });      
  }
  

  function getChoreGoalCard(item, progress) {
    // List sub chores
    let subChores = "";
    item.chores.forEach(subChore => {
      let s = JSON.parse(sessionStorage.getItem(subChore));
      if (s != null) {
        subChores = subChores + "<br>- " + s.chore; 
      }
    });
  
    let rewardSection = "";
    if (item.reward != "") {
        rewardSection += "<span class='glyphicon glyphicon-gift dot'></span>"; 
    }
  
    let progressPercentage = "width: " + progress*100 + "%; ";
    let listItem = "goalitem" + item.id;
    
    let li = "<div class='progressBarBorder'> <div class='progressBar' style='"+ progressPercentage +"'></div></div> <li id='" + listItem + "'> "+
    "<div class='listItemRow'>" + item.title + "<div class='acceptIcons'> <div class='acceptIcons'> " + rewardSection + 
    "<button class='btn btn-primary iconButton glyphicon glyphicon-menu-down' type='button' data-toggle='collapse' data-target='#"+ item.id + "' aria-expanded='false' aria-controls='"+ item.id + "'></i></button>" +
    "</div></div></div> <div class='collapse listItemContent' id='"+ item.id + "'> <div class='card card-body'> <div class='cardSections'> " + 
    "Reward: " + item.reward +
    "<br> <br> Description: " + item.desc + 
    "<br> <br> Chores to complete:" + subChores + " </p>" +
    "</div></div></div> </li>";
    
    return li;
  }
  

  function getScoreGoalCard(item, progress) {    
    let rewardSection = "";
    if (item.reward != "") {
        rewardSection += "<span class='glyphicon glyphicon-gift dot'></span>"; 
    }
  
    let listItem = "scoreGoalItem" + item.id;
    let progressPercentage = "width: " + progress*100 + "%; ";
  
    let li = "<div class='progressBarBorder'> <div class='progressBar' style='"+ progressPercentage +"'></div></div> <li id='" + listItem + "'> "+
    "<div class='listItemRow'>" + item.title + "<div class='acceptIcons'> <div class='acceptIcons'> " + rewardSection + 
    "<button class='btn btn-primary iconButton glyphicon glyphicon-menu-down' type='button' data-toggle='collapse' data-target='#"+  item.id + "' aria-expanded='false' aria-controls='"+ item.id + "'></i></button>" +
    "</div></div></div> <div class='collapse listItemContent' id='"+ item.id + "'> <div class='card card-body'> <div class='cardSections'> " + 
    "Reward: " + item.reward +
    "<br><br>Description: " + item.desc + " </p>" + 
    "</div></div></div> </li>";
  
    return li;
  }