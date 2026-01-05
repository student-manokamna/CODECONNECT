const jwt= require("jsonwebtoken")
const User=require("../models/user")

const userAuth=async (req,res,next)=>{
   //read the token from thr request cookies
 try{
   const cookies=req.cookies;
   const {token} =cookies;
   if(!token){
      return res.status(401).send("please login")
   }
    const decodedObj= await jwt.verify(token,"DEV@Tinderpo7")
   //validate the token
   const {_id}=decodedObj;
   const user=await User.findById(_id)
   if(!user){
      throw new Error("user not found")
  }
  req.user=user;
  next();
 }
 catch(err){
   res.status(400).send("ERROr :: "+err.message)  // do error handeling
}
   // find the user
}
module.exports={
    userAuth,
};