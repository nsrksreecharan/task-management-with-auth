require("dotenv").config();

const app=require("./app");

const connectDB=require("./config/db");
connectDB();

// const PORT=process.env.PORT || "5000";
// app.listen(PORT,()=>{
//     console.log("Server Running at PORT http://localhost:5000");
// });

module.exports = app;