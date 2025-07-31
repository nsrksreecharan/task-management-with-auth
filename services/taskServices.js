const { default: mongoose } = require("mongoose");
const Task=require("../model/task");

exports.getAllTasks=(userId)=>Task.find({userId}).sort({createdAt:-1});

exports.getTaskById=(id)=>Task.findById(id);

exports.getUserStats=async (userId) => {
  const result = await Task.aggregate([
    {
      $match: {
        userId: new mongoose.Types.ObjectId(userId),
      },
    },
    {
      $group: {
        _id: "$status",
        count: { $sum: 1 },
      },
    },
    {
      $project: {
        _id: 0,
        status: "$_id",
        count: 1,
      },
    },
  ]);

  // All possible statuses
  const allStatuses = ["todo", "in-progress", "completed"];

  // Initialize with 0
  const finalResult = allStatuses.map((status) => {
    const found = result.find((item) => item.status === status);
    return {
      status,
      count: found ? found.count : 0,
    };
  });

  return finalResult;
};


exports.getUserData=(userId)=>{
    return Task.aggregate([
        {
            $match:{
                userId:new mongoose.Types.ObjectId(userId),
            }
        },
        {
            $group:{
                _id:"$userId",
                totalTasks:{$sum:1}
            }
        },
        {
            $lookup:{
                from:"users",
                localField:"_id",
                foreignField:"_id",
                as:"userInfo"
            }
        },
        {
            $unwind:"$userInfo",
        },
        {
            $project:{
                _id:0,
                userId:"$userInfo._id",
                username:"$userInfo.name",
                email:"$userInfo.email",
                totalTasks:1,
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