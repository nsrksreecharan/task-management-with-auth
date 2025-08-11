const mongoose=require("mongoose");
require("dotenv").config();

const connectDB=async()=>{
    try{
        console.log('MONGODB_URI:', process.env.MONGODB_URI);
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("DB Connected Successfully");
    }catch(err){
        console.log("Error while connecting to DB",err);
        process.exit(1);
    }
};

module.exports=connectDB;