const express =require("express")
const transaction =require("../model/Transaction")
const Helpers =require("../Helper")
const User =require("../model/User")
const Joi =require("joi")
const jwt =require("jsonwebtoken")

const Transaction =async(req,res)=>{
    try {
        let {from,to,amount,kind,reference}=req.body
        const joiSchema =Joi.object({
            
            from: Joi.string().pattern(new RegExp(/(^(\+88|0088)?(01){1}[3456789]{1}(\d){8})$/)).required().messages({
                'string.pattern.base':'please provide a bangladeshi phone number'
            }),
            to: Joi.string().pattern(new RegExp(/(^(\+88|0088)?(01){1}[3456789]{1}(\d){8})$/)).required().messages({
                'string.pattern.base':'please provide a bangladeshi phone number'
            }),
            amount:Joi.number().required(),
            kind: Joi.string().required(),
            reference:Joi.string(),
            
    })
    const validation = joiSchema.validate(req.body)
          if(validation.error){
                return res.status(500).send({
                success:false,
                message:validation.error.details[0].message,
                body:req.body,
            })
          }
          const fromAccount = await User.findOne({phone: from});
          const toAccount = await User.findOne({phone: to});
          // check from exists
          if(!fromAccount){
              return res.status(404).send({
                  success : false,
                  msg: "Kire Beta Chor!",
                  body: req.body
              })
          }
          // check to exists
          if(!toAccount){
              
              if(kind !== "Mobile Recharge"){
                  
                  return res.status(404).send({
                      success : false,
                      msg: `Account does not exist.`,
                      body: req.body
                  })
              }
          }

          //permission
          const permissions =require("../PermissionDataset")
          const transactionPermission =Helpers.verifyTransactionPermission(req.authData,permissions,kind);
          
         
         if(!transactionPermission){
            return  res.status(404).send({
                success:false,
                message:'you do not have permission to create ' + kind,
                body:req.body
            })
         } 
        const cookedTransactions =await  Helpers.cookTransaction(fromAccount, toAccount, amount, kind, transactionPermission, req.authData);
        console.log(cookedTransactions);
         
}catch (error) {
    return res.status(500).send({
        success:false,
        message:error.message,
        tag:'Internal problem'
    })
    }
}
module.exports =Transaction
