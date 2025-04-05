document.addEventListener("DOMContentLoaded",function(){
    const todoInput=document.getElementById("todo-input");
const addTaskBtn=document.getElementById("add-task-btn");
const todoList=document.getElementById("todo-list");

let tasks= JSON.parse(localStorage.getItem("tasks"))||[];
 tasks.forEach((task)=> renderTask(task));

addTaskBtn.addEventListener("click",function(){
    const taskText=todoInput.value.trim();
    if(taskText ==="") return;

    const newTask={
        id: Date.now(),
        text: taskText,
        completed:false
    }
    tasks.push(newTask);
    saveTasks(); //save tasks to local storage
    renderTask(newTask);
     todoInput.value=""; //clear the input field
     console.log(tasks);
});

function renderTask(task){
       const li= document.createElement("li");
       li.setAttribute("data-id",task.id);
       if(task.completed) li.classList.add("completed");
       li.innerHTML=`
        <span>${task.text}</span>
        <button>delete</button>
       `;
       li.addEventListener("click",(e)=>{
        if(e.target.tagName==="BUTTON") return;
        task.completed = !task.completed;
        li.classList.toggle("completed")
        saveTasks()
       })
       todoList.appendChild(li);

       li.querySelector('button').addEventListener("click",(e)=>{
        e.stopPropagation() // prevent toggle from firing
        tasks= tasks.filter(t => t.id === task.id);
        li.remove();
        saveTasks();
       })
}

function saveTasks(){
    localStorage.setItem("tasks",JSON.stringify(tasks));
}
})