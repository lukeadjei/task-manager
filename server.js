//packages
require('dotenv').config(); //this is getting the .env file and giving everything access to keys in the node js code
const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const Task = require("./models/Tasks");
const path = require("path");
const User = require("./models/User");
const bcrypt = require ("bcrypt");
//Server Setup creation of express package
const app = express();
const PORT = 3000;
//Middleware meaning the functions that get applied to request before heading to main things
app.use(cors());
app.use(express.json());
app.use(express.static("public")); //this is saying that we want to serve static files from the public folder


//database setup creation of mongoose package
mongoose.connect(process.env.MONGO_URI).then(() => console.log("Connected!")).catch((error) => console.log("There was an error trying to connect to the database", error));


//starting the server
app.listen(PORT, () => {
    console.log(`Server is running on local host with the port:${PORT}`);
})

//default route to homepage
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});


// route to retrieve information specifically tasks
app.get("/tasks", protect, async (req, res) => {
    try{
        const tasks = await Task.find();
        res.json(tasks);
    }catch (error){
        res.status(500).json({message: "Error trying to find task"});
    }
});

//route to create task or sending data to server
app.post("/tasks", protect, async (req, res) => {
    try{
        const sentData = await Task.create(req.body);
        res.status(201).json(sentData);
    }catch(error){
        res.status(500).json({message: "Server Error"});
    }
});


//Route to update 
app.patch("/tasks/:id", protect, async (req,res) =>{
    try{
        const id = req.params.id;
        const newData = await Task.findByIdAndUpdate(id, req.body, {new: true});

        //add check incase id is null
        //Code 404 means user not found 
        if (!newData){
            return res.status(404).json({message: "Task could not be found"});
        }

        res.status(200).json(newData);
    }catch(error){
        res.status(500).json({message: "Server Error something went wrong"});
    }
})

//Route to delete
app.delete("/tasks/:id", protect, async (req, res) => {
    try{
        const id = req.params.id
        

        const deletedInfo = await Task.findByIdAndDelete(id)

        //Code 404 means user not found
        if(!deletedInfo){
            return res.status(404).json({message: "there was a problem finding the id"});
        }
        res.json({message:"Task successfully deleted"});

    }catch(error){
        res.status(500).json({message: "There was a problem deleting the task", error})
    }
});





//Registration Routes
app.post("/register", async (req, res) => {
    try {
        const {email, password} = req.body;

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user
        const newUser = await User.create({
            email,
            password: hashedPassword
        });

        res.status(201).json({message: "User Created Successfully", userId: newUser._id});
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
});



app.post("/login", async (req, res) => {
    try{
        const {email, password} = req.body;

        //check if the email is valid
        const user = await User.findOne({email});
        if (!user){
            return res.status(401).json({message: "Invalid Credentials"});
        }

        
        //Returns true or false checking inputted password against hashed pasword 
        const isMatch = await bcrypt.compare(password, user.password)

        if (!isMatch){
            return res.status(401).json({message: "Unauthorized"});
        }

        return res.status(200).json({message:"success"});

    }catch(error){
        console.log(error);
        return res.status(500).json({message: "Server Error ... Maybe :P"})
    }
    
});