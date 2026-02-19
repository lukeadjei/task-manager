//Server Setup creation of express package
const express = require("express");
const app = express();
const PORT = 3000;

//array to hold task
const taskDataBaseArray = [];


//Middleware meaning the functions that get applied to request before heading to main things
app.use(express.json());



//starting the server
app.listen(PORT, () => {
    console.log('Server is running on local host with the port:${PORT}');
})

// route to retrieve information specifically tasks
app.get("/tasks", (req, res) => {
    res.json(taskDataBaseArray);
})

//route to update or sending data to server
app.post("/tasks", (req, res) => {
    const task = req.body; //this is the js data that was sent
    taskDataBaseArray.push(task); //putting inside of "fake database"
    res.status(201).json(task);
})

