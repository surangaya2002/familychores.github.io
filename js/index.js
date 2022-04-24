// Categories for data
let toDo = "toDo";
const scoreGoal = "scoreGoal";
const choreGoal = "choreGoal";

// TEMP SHOW DATA
let chore1 = {
    category: toDo,
    id: "ParentToDo1",
    chore: "Take out the garbage",
    score: 25,
    reward: "",
    due: "",
    time: "",
    desc: "Recycle the plastic waste",
    done: false,
    accepted: false,
    retry: false,
  }

  let chore2 = {
    category: toDo,
    id: "ParentToDo2",
    chore: "Clean bedroom",
    score: 50,
    reward: "Ice cream",
    due: "2022-04-25",
    time: "18:00",
    desc: "Make the room shine!",
    done: false,
    accepted: false,
    retry: true,
    declineDesc: "There is still lego on the floor" 
  }

  let chore3 = {
    category: toDo,
    id: "ParentToDo3",
    chore: "Take out the dishes from the dishwasher",
    score: "",
    reward: "",
    due: "2022-04-21",
    time: "20:00",
    desc: "",
    done: false,
    accepted: false,
    retry: false,
  }

  let chore4 = {
    category: toDo,
    id: "ParentToDo4",
    chore: "Do the math homework",
    score: "5",
    reward: "",
    due: "2022-04-26",
    time: "19:00",
    desc: "Count task 4 - 19",
    done: true,
    accepted: false,
    retry: false,
  }

  let goal1 = {
    category: choreGoal,
    id: "goal1",
    title: "Clean the whole apartment",
    reward: "Trip to the zoo",
    desc: "Complete all cleaning chores",
    chores: ["ParentToDo1", "ParentToDo2"],
    done: false,
  }

  let goal2 = {
    category: scoreGoal,
    id: "goal2",
    title: "Have 3000 points",
    reward: "Cinnamon buns",
    desc: "Do random chores to collect points",
    done: false,
    points: 3000,
  }
  
  let data = [chore1, chore2, chore3, chore4, goal1, goal2];
  

  $(document).ready(function () {  
    setTempShowData();
  });


  function setTempShowData(){
    data.forEach(item => {
       // Set session data
       sessionStorage.setItem(item.id, JSON.stringify(item));
    });
  }
  