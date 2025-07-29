const Task=require("../model/task");
exports.getAllTasks=()=>Task.find().sort({createdAt:-1});
exports.getTaskById=(id)=>Task.findById(id);
exports.updateTaskById=(id,body)=>Task.findByIdAndUpdate(id,body,{new:true});
exports.updateTasksMany=(body)=>Task.updateMany(
    {_id:{$in:body.taskIds}},
    {$set:{[body.field.name]:body.field.value}}
);
exports.deleteTaskById=(id)=>Task.findByIdAndDelete(id);
exports.deleteTasks=(body)=>Task.deleteMany(
    {_id:{$in:body.taskIds}}
);
exports.createTask=(data)=>Task.create(data);