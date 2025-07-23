const Task=require("../model/task");
exports.getAllTasks=()=>Task.find().sort({createdAt:-1});
exports.getTaskById=(id)=>Task.findById(id);
exports.updateTaskById=(id,body)=>Task.findByIdAndUpdate(id,body,{new:true});
exports.deleteTaskById=(id)=>Task.findByIdAndDelete(id);
exports.createTask=(data)=>Task.create(data);