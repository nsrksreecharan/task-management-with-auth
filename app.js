const express=require("express");
const morgan=require("morgan");
const cors=require("cors");
const errorHandler=require("./middleware/errorHandler");
const tasksRoute=require("./routes/tasksRoute");
const userRoute=require("./routes/userRoute");
const {protect}=require("./middleware/authentication");

const app=express();
app.use(morgan("dev"));

app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://nsrksreecharan.github.io",
      "https://nsrksreecharan.github.io/Task-Management-App",
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());
app.use("/task-api",protect,tasksRoute);
app.use("/user",userRoute);
app.use(errorHandler);

module.exports=app;


