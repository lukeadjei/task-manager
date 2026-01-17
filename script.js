const input = document.getElementById("taskInput");
const button = document.getElementById("addBtn");
const list = document.getElementById("taskList"); 

let taskArray = [];
if (localStorage.getItem("taskArray") !== null){

    taskArray = JSON.parse(localStorage.getItem("taskArray"));
}



const renderTask = () =>{
    list.innerHTML = "";
    for(let i = 0; i < taskArray.length; i++){
        const li = document.createElement("li");
        const deleteBtn = document.createElement("button");
        const completeBtn = document.createElement("input");

        completeBtn.type = "checkbox";
        
        if (taskArray[i].completed === true){
            completeBtn.checked = true;
        }

        deleteBtn.textContent = "DELETE";
        li.textContent = taskArray[i].text;

        deleteBtn.addEventListener("click", () => {
            taskArray.splice(i, 1);
            localStorage.setItem("taskArray", JSON.stringify(taskArray));
            renderTask()
        })

        completeBtn.addEventListener("change", () => {
            //grab the event and set equal to true and save it 
            taskArray[i].completed = completeBtn.checked
            localStorage.setItem("taskArray", JSON.stringify(taskArray));
            renderTask()
        } )

        li.appendChild(completeBtn);
        li.appendChild(deleteBtn);
        list.appendChild(li);
    }

}

renderTask();

function addItemToList (){
    const taskText = input.value;
    
    if (taskText.trim() === ""){
        return;
    }

    const taskObject = {
        text: taskText,
        completed: false
    };

    //Put the task inside the array and save the array to local storage
    taskArray.push(taskObject);
    localStorage.setItem("taskArray", JSON.stringify(taskArray));
    input.value = "";
    renderTask();

}

button.addEventListener("click", addItemToList);
input.addEventListener("keydown", (event) =>{
    if(event.key === "Enter"){
        addItemToList();
    }
});


