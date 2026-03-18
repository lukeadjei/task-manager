const mongoose = require("mongoose");
//Creates a blueprint for data
const taskSchema = new mongoose.Schema({
    text: String,
    completed: Boolean
});

//This will create a model or obnject based on the blueprint or the schema
const Task = mongoose.model('Task', taskSchema);

module.exports = Task;