const mongoose=require("mongoose");

const taskSchema=mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users", // assuming your user model is called 'User'
        required: true,
    },
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
    checked:{
        type:Boolean,
    },
    description:{
        type:String,
        maxlength: [250, "Description must be at most 250 characters long"]
    }
},{
    timestamps:true
});

module.exports=mongoose.model("tasks",taskSchema);