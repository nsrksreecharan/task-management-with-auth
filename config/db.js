const mongoose=require("mongoose");

const connectDB=async()=>{
    try{
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("DB Connected Successfully");
    }catch(err){
        console.log("Error while connecting to DB",err);
        process.exit(1);
    }
};

module.exports=connectDB;