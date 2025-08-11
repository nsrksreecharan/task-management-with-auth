const userServices=require("../services/userServices");
const tokenServices=require("../services/tokenServices");

exports.registerUser=async(req,res,next)=>{
    try{
        const {email,name,password}=req.body;
        const existingUser=await userServices.getUserByEmail(email);
        if(existingUser){
            return res.status(401).json({message:"User Already Exists with this email"});
        }
        const user=await userServices.createUser(req.body);
        const token=await tokenServices.createToken(user.id);
        res.status(201).json({
            message:"User Created Successfully",
            token,
            user:{
                id:user._id,
                name:user.name,
                email:user.email,
            },
        });
    }catch(err){
        next(err);
    }
}

exports.loginUser=async(req,res,next)=>{
    try{
        const {email,password}=req.body;
        const user=await userServices.getUserByEmail(email);
        if(!user){
            console.log(user,"user")
            return res.status(404).json({message:"User not found with this email"});
        }
        const isMatch = await user.checkPassword(password);
        if (!isMatch) {
        return res.status(404).json({ message: "Invalid Password" });
        }
        const token=await tokenServices.createToken(user.id);
        res.json({
            message:"User Logged in Successfully",
            token,
            user:{
                id:user._id,
                name:user.name,
                email:user.email,
            },
        })
    }catch(err){
        next(err);
    }
}

exports.getLeaderBoard=async(req,res,next)=>{
    try{
        const leaderBoard=await userServices.getLeaderBoard();
        if(!leaderBoard) res.status(404).json({message:"No Data Found"});
        res.json({leaderBoard});
    }catch(err){
        next(err);
    }
}