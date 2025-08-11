const express=require("express");
const morgan=require("morgan");
const cors=require("cors");
const errorHandler=require("./middleware/errorHandler");
const tasksRoute=require("./routes/tasksRoute");
const userRoute=require("./routes/userRoute");
const {protect}=require("./middleware/authentication");

const app=express();
app.use(morgan("dev"));
app.use(cors());
app.use(express.json());
app.use("/task-api",protect,tasksRoute);
app.use("/user",userRoute);
app.use(errorHandler);

module.exports=app;


