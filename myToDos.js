
//get the buttons
const addNewTaskBtn = document.getElementById("add-task-btn");
const taskForm = document.getElementById("task-form");
const titleInput = document.getElementById("task-title");
const dateInput = document.getElementById("task-date");
const descriptionInput = document.getElementById("description");
const taskList = document.getElementById("task-list");
const closeBtn = document.getElementById("close-btn");
const dialogue = document.getElementById("dialogue");
const submitBtn = document.getElementById("submit-btn");

//declare global variables
let taskArray = [];
let currentTask = {};


//function to toggle the "hidden" class
const toggleClasses = () =>{
  taskForm.classList.toggle("hidden");
  addNewTaskBtn.classList.toggle("hidden");
}

//add new task button listener
addNewTaskBtn.addEventListener("click", ()=>{
  toggleClasses();
})

//functions for the discard modal
closeBtn.addEventListener("click", ()=>{
  dialogue.showModal();
})
function discard(){
  dialogue.close();
  toggleClasses();
  clearInputs();
}
function notdiscard(){
  dialogue.close();
}

//create the object for the inputs
const getInputValues = () =>{
  const taskObject = {
    id: Date.now(),
    title: titleInput.value,
    date: dateInput.value,
    description: descriptionInput.value
  }
  return taskObject;
}



//map the Task Array to the HTML
const displayTask = () =>{
  const taskHTML = taskArray.map(({id, title, date, description})=>{
    return `<div id="tasklist"><div> Title: ${title}</div>
     <div>Date: ${date}</div>
     <div>Description: ${description}</div>
     <button id="${id}" onclick="editTask(this)" class="edit-delete">Edit</button><button id="${id}" onclick="deleteTask(this)" class="edit-delete">Delete</button></div>`
    }).join("");
  taskList.innerHTML = taskHTML;
}

// function to clear the Task HTML
const clearTasks = () => {
  
  taskList.innerHTML = "";
}

//function to clear input values in the form
const clearInputs = () =>{
  titleInput.value="";
  dateInput.value="";
  descriptionInput.value="";
}

//listener and function for adding a task 
taskForm.addEventListener("submit", (e) => {
  e.preventDefault();
  if(titleInput.value){
    const dataIndex = taskArray.findIndex(item=>item.id===currentTask.id);
    clearTasks();

    if(dataIndex===-1){
    taskArray.push(getInputValues());
    }
    else{
    taskArray[dataIndex] = getInputValues();
    submitBtn.innerText = "Add Task";
    }

    displayTask();
    console.log(taskArray);
    clearInputs();
    toggleClasses();
    localStorage.setItem("data", JSON.stringify(taskArray));
  }
  else{
    alert("You have to put a title to your task.")
  }

})

//map the saved tasks from Local Storage
if(localStorage.getItem("data")){
  const retrievedArray = JSON.parse(localStorage.getItem("data"));
  taskArray = retrievedArray;
  console.log(taskArray);
  displayTask();
}

//function to edit task
const editTask = (ed) =>{
  const currentIndex = taskArray.findIndex(item=>item.id===Number(ed.id));
  
  currentTask = taskArray[currentIndex];
  
  taskForm.classList.remove("hidden");
  addNewTaskBtn.classList.add("hidden");
  
  
  titleInput.value = taskArray[currentIndex].title;
  dateInput.value = taskArray[currentIndex].date;
  descriptionInput.value = taskArray[currentIndex].description;
  submitBtn.innerText= "Update Task";
  localStorage.setItem("data", JSON.stringify(taskArray));

}

//function to delete task
const deleteTask = (ed) =>{

  const currentIndex = taskArray.findIndex(item=>item.id=Number(ed.id));
  taskArray.splice(currentIndex,1);
  localStorage.setItem("data", JSON.stringify(taskArray));
  displayTask();
  
}

