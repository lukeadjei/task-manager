//packages
require('dotenv').config(); //this is getting the .env file and giving everything access to keys in the node js code
const mongoose = require("mongoose");
const express = require("express");
//Server Setup creation of express package
const app = express();
const PORT = 3000;
//Middleware meaning the functions that get applied to request before heading to main things
app.use(express.json());

//database setup creation of mongoose package
mongoose.connect(process.env.MONGO_URI).then(() => console.log("Connected!")).catch((error) => console.log("There was an error trying to connect to the database", error));

//array to hold task
const taskDataBaseArray = [];

//Creates a blueprint for data
const taskSchema = new mongoose.Schema({
    text: String,
    completed: Boolean
});

//This will create a model or obnject based on the blueprint or the schema
const Task = mongoose.model('Task', taskSchema);

//starting the server
app.listen(PORT, () => {
    console.log(`Server is running on local host with the port:${PORT}`);
})

// route to retrieve information specifically tasks
app.get("/tasks", async (req, res) => {
    try{
        const tasks = await Task.find();
        res.json(tasks);
    }catch (error){
        res.status(500).json({message: "Error trying to find task"});
    }
});

//route to update or sending data to server
app.post("/tasks", async (req, res) => {
    try{
        const sentData = await Task.create(req.body);
        res.status(201).json(sentData);
    }catch(error){
        res.status(500).json({message: "Server Error"});
    }
});

