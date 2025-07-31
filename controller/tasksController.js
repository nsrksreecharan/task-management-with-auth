const taskServices=require("../services/taskServices");

exports.getTasks=async(req,res,next)=>{
    try{
        const userId=req.user._id;
        const tasks=await taskServices.getAllTasks(userId);
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




exports.getUserInfo=async(req,res,next)=>{
    try{
        const userId=req.user._id;
        const userInfo=await taskServices.getUserData(userId);
        console.log(userInfo,"userInfo");
        if(!userInfo) res.status(404).json({message:"No Data Found"});
        res.json({userInfo});
    }catch(e){
        
    }
}

exports.getUserStats=async(req,res,next)=>{
    try{
        const userId=req.user._id;
        const stats=await taskServices.getUserStats(userId);
        if(!stats) res.status(404).json({message:"No Data Found"});
        res.json({stats});
    }catch(err){
        next(err);
    }
}

exports.updateTaskById=async(req,res,next)=>{
    try{
        const task=await taskServices.updateTaskById(req.params.id,{...req.body,userId:req.user._id});
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
        const task=await taskServices.createTask({...req.body,userId:req.user._id});
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
