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
        res.josn({task})
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