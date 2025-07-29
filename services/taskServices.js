const { default: mongoose } = require("mongoose");
const Task=require("../model/task");

exports.getAllTasks=()=>Task.find().sort({createdAt:-1});

exports.getTaskById=(id)=>Task.findById(id);

exports.getLeaderBoard=()=>{
    return Task.aggregate([
        {
            $match: { status:"completed"},
        },
        {
            $group:{
                _id:"$email",
                completedTasks:{ $sum:1 },
            }
        },
        {
            $lookup:{
                from:"users",
                localField:"_id",
                foreignField:"email",
                as:"user"
            }
        },
        {
            $unwind:"user"
        },// to flatten the result of lookup array
        {
            $project:{
                _id:0,
                username:"$user.name",
                email:"$user.email",
                completedTasks:1
            }
        },
        {
            $sort:{completedTasks:-1},
        }
    ])
}

exports.getUserStats=(userId)=>{
    return Task.aggregate([
        {
            $match:{
                userId:new mongoose.Types.ObjectId(userId),
            }
        },
        {
            $group:{
                _id:"$status",
                count:{$sum:1}
            }
        },
        {
            $project:{
                _id:0,
                status:"$_id",
                count:1,
            }
        }
    ])
}


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