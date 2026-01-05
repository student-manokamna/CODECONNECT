const mongoose=require("mongoose");
const User=require("./user")
const connectionRequestSchema= new mongoose.Schema({
    fromUserId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",// referncd to user collection or table link between two table
        required:true,
    },
    toUserId:{
        type:mongoose.Schema.Types.ObjectId ,
        ref:"User",
        required:true,
    },
    status:{
        type:String,
        required:true,
        enum:{
            values:["ignore" ,"interested","accepted","rejected"],
            message:`{value} is incorrect status type`
        },
       
    },
},
    {
        timestamps:true,
    }
)
//now  find krna fast hh to make query fast make compund index
// connectionRequestSchema.index({fromUserId:1});
connectionRequestSchema.index({fromUserId:1,toUserId:1}); //compond indexwhen you query with boht it become very fast this query fast even million

//like schmea methis there is pre=pre is like a middleware any time connectionrequesr is save then this method is called
connectionRequestSchema.pre("save",function(next){
    const connectionRequest=this 
    //cehck if from userid is same as touserid but it is object so not cmpare 
    if(connectionRequest.fromUserId.equals(connectionRequest.toUserId)){
        throw new Error("can not send connection request to yourself")
    }
    next() //never forget to call this to hi code age  ove hoga
});//everytime before you save job of shema to check
const ConnectionRequestModel=new mongoose.model("ConnectionRequest",connectionRequestSchema);
module.exports=ConnectionRequestModel