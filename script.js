const input = document.getElementById("taskInput");
const button = document.getElementById("addBtn");
const list = document.getElementById("taskList");
const taskArray = [];

function addItemToList (){
    const taskText = input.value;

    if (taskText.trim() === ""){
        return;
    }

    const li = document.createElement("li");
    li.textContent = taskText;

    taskArray.push(li)
    
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

    input.value = "";

}

button.addEventListener("click", addItemToList);
input.addEventListener("keydown", (event) =>{
    if(event.key === "Enter"){
        addItemToList();
    }
});


