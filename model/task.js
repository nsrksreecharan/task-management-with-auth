const mongoose=require("mongoose");

const taskSchema=mongoose.Schema({
    task:{type:String,require:true},
    status:{
        type:String,
        enum:["todo","in-progress","completed"],
        default:"todo",
    },
    priority:{
        type:String,
        enum:["low","medium","high"],
        default:"",
    },
    dueDate:Date,
},{
    timestamps:true
});

module.exports=mongoose.model("tasks",taskSchema);