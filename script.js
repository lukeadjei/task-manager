const input = document.getElementById("taskInput");
const button = document.getElementById("addBtn");
const list = document.getElementById("taskList");

let taskArray = [];
if (localStorage.getItem("taskArray") !== null){

    taskArray = JSON.parse(localStorage.getItem("taskArray"));
}



function addItemToList (){
    const taskText = input.value;

    if (taskText.trim() === ""){
        return;
    }

    const li = document.createElement("li");
    li.textContent = taskText;

    
    
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "DELETE";

    deleteBtn.addEventListener("click", () =>{
        list.removeChild(li);
    });

    li.addEventListener("click", () => {
        list.removeChild(li)
    });

    li.appendChild(deleteBtn);
    list.appendChild(li);

    //Put the task inside the array and save the array to local storage
    taskArray.push(li)
    localStorage.setItem("taskArray", JSON.stringify(taskArray))
    input.value = "";

}

button.addEventListener("click", addItemToList);
input.addEventListener("keydown", (event) =>{
    if(event.key === "Enter"){
        addItemToList();
    }
});


