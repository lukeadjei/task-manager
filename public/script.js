const input = document.getElementById("taskInput");
const button = document.getElementById("addBtn");
const list = document.getElementById("taskList"); 

let taskArray = [];


//
async function getTasksFromServer(){
    try{
        taskArray = [];
        const response = await fetch("/tasks");
        const data = await response.json();
        
        taskArray = data;

        renderTask();
        console.log("Tasks successfully retrieved from server", data);
    }catch(error){
        console.log("Error fetching tasks from server", error);
    }     
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

        deleteBtn.addEventListener("click", async () => {
            try{
                const response = await fetch(`/tasks/${taskArray[i]._id}`, 
                    {
                        method: "DELETE",
                        headers: {
                            "Content-Type": "application/json"
                        }

                    });
                console.log("successfully deleted task from server", response.status);
                taskArray.splice(i, 1);
                renderTask();
            }catch(error){
                console.log("Error deleting task from server", error);
            }
            
            
            //taskArray.splice(i, 1);
            //localStorage.setItem("taskArray", JSON.stringify(taskArray));
            //renderTask()
        })

        completeBtn.addEventListener("change", async () => {
            //grab the event and set equal to true and save it 
            taskArray[i].completed = completeBtn.checked
            try {
                const response = await fetch(`/tasks/${taskArray[i]._id}`,
                    {
                        method: "PATCH",
                        headers:{
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({completed: taskArray[i].completed})
                    }
                );
                const data = await response.json();
                console.log("Task successfully updated on the server", data);
            }catch(error){
                taskArray[i].completed = !taskArray[i].completed;
                completeBtn.checked = taskArray[i].completed;
                console.log("error updating task on server", error);
            }
        });
        
        li.appendChild(document.createTextNode(taskArray[i].text));
        li.appendChild(completeBtn);
        li.appendChild(deleteBtn);
        list.appendChild(li);
    }

}



async function addItemToList (){
    const taskText = input.value;
    
    if (taskText.trim() === ""){
        return;
    }

    const taskObject = {
        text: taskText,
        completed: false
    };
    try{
        const response = await fetch("/tasks", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(taskObject)
        });
        const data = await response.json();
        console.log("Task successfully sent to the server and has returned it.", data);

        taskArray.push(data);
        renderTask();
    }catch(error){
        console.log("Error sending the task to the server", error);

    }
}

button.addEventListener("click", addItemToList);
input.addEventListener("keydown", (event) =>{
    if(event.key === "Enter"){
        addItemToList();
    }
});


getTasksFromServer();
