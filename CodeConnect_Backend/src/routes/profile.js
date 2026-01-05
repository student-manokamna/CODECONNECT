const express=require("express")
const profileRouter=express.Router()
const {userAuth}=require("../middlewares/auth")
const {validateEditProfileData}=require("../utils/validation")
const bcrypt=require("bcrypt")
const validator=require("validator")
profileRouter.get("/profile/view",userAuth,async (req,res)=>{
    try{
    //     const cookies=req.cookies;
    // //extract token from cookie
    // const {token}=cookies;
    // if(!token){
    //     throw new Error("invalid token")
    // }
    //validarte token
    // const decodedMessage=await  jwt.verify(token,"DEV@Tinderpo7")
    // console.log(decodedMessage)
    // const {_id}=decodedMessage;
    // console.log("logged in user is: "+ _id)
    // console.log(cookies) //cookies==token  
    // const user= await User.findById(_id) already checked in auth middle ware wheter user exist or not
    const user= req.user;

    if(!user){
        throw new Error("user does not exist")
    }
    res.send(user); // profile vale me iska result aa jayega
    }
    catch(err){
        res.status(400).send("ERROr ::"+err.message)  // do error handeling
    }
})
profileRouter.patch("/profile/edit",userAuth, async (req,res)=>{
    try{
        if(!validateEditProfileData(req)){
            throw new Error("invalid Edit request")
        }
        const loggedInUser=req.user
        // loggedInUser.firstName=req.body.firstName same as down
        Object.keys(req.body).forEach((key)=>(loggedInUser[key]=req.body[key]))
        
        // console.log(loggedInUser)
        
        await loggedInUser.save()
        res.json({message:`${loggedInUser.firstName} profile updates successfull!!`,data:loggedInUser,})
    }
    catch(err){
        res.status(400).send("ERROr ::"+err.message)  // do error handeling
    }
})

profileRouter.patch("/profile/password",userAuth,async (req,res)=>{
    
    try{
        const loggedInUser=req.user
        const oldPassword=req.body.oldPassword;
        const newPassword = req.body.newPassword;
        const isOldPasswordValid=await loggedInUser.validatePassword(oldPassword)
        // if()
    // const newPassword=req.body.passWord;
        if (!isOldPasswordValid) {
            return res.status(400).send("Invalid old password.");
        }
    if(!validator.isStrongPassword(newPassword)){
        throw new Error("Enter a strong password : ");
    }
    const newpasswordHash= await bcrypt.hash(newPassword,10);
    loggedInUser.passWord=newpasswordHash
    await loggedInUser.save();
    // console.log(newpasswordHash)
    // console.log(newPassword)
    res.status(200).send("Password updated successfully.");

}
catch(err){
    
    res.status(400).send("ERROr ::"+err.message)  // do error handeling
}
})
module.exports=profileRouter;