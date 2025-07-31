const express=require("express");
const router=express.Router();
const {registerUser,loginUser,getLeaderBoard}=require("../controller/userController");


router.post("/register",registerUser);
router.post("/login",loginUser);
router.route("/leaderboard")
    .get(getLeaderBoard)

module.exports=router;