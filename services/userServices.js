const User=require("../model/user");
exports.updateUser=(id,data)=>User.findByIdAndUpdate(id,data);
exports.getUserByEmail=(email)=>User.findOne({email}).select("+password");
exports.getUserById=(id)=>User.findById(id).select("-password");//findOne({_id:id})
exports.createUser=(data)=>User.create(data);
exports.deleteUser=(id)=>User.findByIdAndDelete(id);