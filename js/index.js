// Categories for data
let toDo = "toDo";
const goal = "goal";

// TEMP SHOW DATA
let chore1 = {
    category: toDo,
    id: "ParentToDo1",
    chore: "Take out the garbage",
    score: 25,
    reward: "",
    due: "",
    time: "",
    desc: "",
    done: false,
    accepted: false,
    retry: false,
  }

  let chore2 = {
    category: toDo,
    id: "ParentToDo2",
    chore: "Clean bedroom",
    score: 50,
    reward: "Icecream",
    due: "2022-04-25",
    time: "",
    desc: "Make the room shine!",
    done: false,
    accepted: false,
    retry: true,
  }

  let chore3 = {
    category: toDo,
    id: "ParentToDo3",
    chore: "Take out the dishes from the dishwasher",
    score: "",
    reward: "",
    due: "",
    time: "",
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
    due: "",
    time: "",
    desc: "Count task 4 - 19",
    done: true,
    accepted: false,
    retry: false,
  }
  
  let data = [chore1, chore2, chore3, chore4];
  

  $(document).ready(function () {  
    setTempShowData();
  });


  function setTempShowData(){
    data.forEach(item => {
       // Set session data
       sessionStorage.setItem(item.id, JSON.stringify(item));
    });
  }
  