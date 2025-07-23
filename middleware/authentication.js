const tokenServices=require("../services/tokenServices");
const userServices=require("../services/userServices");

exports.protect=async(req,res,next)=>{
    let token;
    if(
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer ")
    ){
        token=req.headers.authorization.split(' ')[1];
    }

    if(!token){
        res.status(401).json({message:"User not logged in"});
    }

    try{
        const decoded=await tokenServices.verifyToken(token);
        req.user=await userServices.getUserById(decoded.id);
        next();
    }catch(err){
        return res.status(401).json({message:"Invalid or Expired Token"});
    }
   
}