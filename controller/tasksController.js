const taskServices=require("../services/taskServices");

exports.getTasks=async(req,res,next)=>{
    try{
        const tasks=await taskServices.getAllTasks();
        res.json({tasks});
    }catch(err){
        next(err);
    }
}

exports.getTaskById=async(req,res,next)=>{
    try{
        const task=await taskServices.getTaskById(req.params.id);
        if(!task) res.status(404).json({message:"Task not found"});
        res.json({task});
    }catch(err){
        next(err);
    }
}

exports.updateTaskById=async(req,res,next)=>{
    try{
        const task=await taskServices.updateTaskById(req.params.id,req.body);
        if(!task) res.status(404).json({message:"Task not found"});
        res.json({task})
    }catch(err){
        next(err);
    }
}

exports.updateTasks=async(req,res,next)=>{
    try{
        if(!Array.isArray(req.body.taskIds)){
            res.status(404).json({message:"Expected Array of Ids"})
        }
        const tasks=await taskServices.updateTasksMany(req.body);
        if(!tasks) res.status(404).json({message:"Tasks not found"});
        res.json({tasks})
    }catch(err){
        next(err);
    }
}

exports.postTask=async(req,res,next)=>{
    try{
        const task=await taskServices.createTask(req.body);
        res.status(201).json({message:"Task Created Successfully",task});
    }catch(err){
        next(err);
    }
}

exports.deleteTaskById=async(req,res,next)=>{
    try{
        const task=await taskServices.deleteTaskById(req.params.id);
        res.json({message:"Task Deleted Successfully"});
    }catch(err){
        next(err);
    }
}

exports.deleteMany=async(req,res,next)=>{
    try{
        if(!Array.isArray(req.body.taskIds)){
            res.status(404).json({message:"Expected Array of Ids"})
        }
        const task=await taskServices.deleteTasks(req.body);
        res.json({message:"Tasks Deleted Successfully"});
    }catch(err){
        next(err);
    }
}
