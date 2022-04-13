// Categories for data
let toDo = "toDo";
const toAccept = "toAccept";
const goal = "goal"

$(document).ready(function () {
      updateScore();
      updateChildToDo();
});


function updateScore() {
const score = 1200; 
// TODO count score...
$("#childScore").html(score);
}


function updateChildToDo() {

    // Get all session data
    let keys = Object.keys(sessionStorage);
    let data = [];
    keys.forEach(key => {
        data.push(JSON.parse(sessionStorage.getItem(key)));
    });

    // Make the cards
    data.forEach(itemData => {

        // Check if it is a ToDo item
        if(itemData.category === toDo) {

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

            // Append card
            $("#childToDoList").append(li);
            $("#rewardrow" + itemData.id).prepend(scoreAndRewardSection);     
        }
    });
}