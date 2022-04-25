// Categories for data
let toDo = "toDo";
const scoreGoal = "scoreGoal";
const choreGoal = "choreGoal";

// Default/start score
let score = 1200; 


$(document).ready(function () {
      updateScore();
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

 function GetItemInShop(cost) {
    score = score - parseInt(cost);
    
    $("#childScore").html(score); 
 }