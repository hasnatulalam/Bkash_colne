const mongoose =require("mongoose")


const transactionSchema = new mongoose.Schema({
    from:{
        type:Object
    },
    to:{
        type:Object
    },
    amount:{
        type:Number
    },
    reference:{
        type:String 
    },
    status:{
        type:String 
    },
    kind:{
        type:String
    },
    createdBy:{
        type:String 
    }

},{timestamps:true})

const transactionModel =mongoose.model("transaction",transactionSchema)
module.exports=transactionModel