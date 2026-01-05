const validator=require("validator");
const validateSignupData=(req)=>{
    const {firstName,lastName,emailId,passWord}=req.body;
    if(!firstName||!lastName){
        throw new Error("name is not valid");
    }
    // else if(firstName.length<4||firstName.length>50){ //we can relie on these check or at check we create at schema level
    //     throw new Error("First name should be of 4-50 character")
    // }
    else if(!validator.isEmail(emailId)){
        throw new Error("enter valid EMail");
    }
    else if(!validator.isStrongPassword(passWord)){
        throw new Error("enter strong password");
    }
}
const validateEditProfileData=(req)=>{
    const allowedEditFields=["firstName","lastName","emailId","photoUrl","gender","age","about","skills"];
    const isEditAllowed=Object.keys(req.body).every(fields=>allowedEditFields.includes(fields));
    return isEditAllowed;
}
module.exports={
    validateSignupData,validateEditProfileData
}
// install bcrypt lib