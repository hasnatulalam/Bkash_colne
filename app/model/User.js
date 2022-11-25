const mongoose =require("mongoose")


const userSchema = new mongoose.Schema({
    name:{
        type:String
    },
    phone:{
        type:String
    },
    pin:{
        type:String
    },
    nid:{
        type:String 
    },
    balance:{
       type:Number
    },
    address:{
        type:String 
    },
    kind:{
        type:String
    },
    createdBy:{
        type:String 
    }

},{timestamps:true})

const userModel =mongoose.model("User",userSchema)
module.exports=userModel

