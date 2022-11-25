const express=require("express")
const jwt =require("jsonwebtoken")
const Joi =require("joi")
const bcrypt =require("bcrypt")
const User =require("../model/User.js")
const permissions =require("../PermissionDataset")

const Register =async(req,res)=>{
   
    try {

        const joiSchema =Joi.object({
            name:Joi.string().min(2).max(250).required(),
            phone: Joi.string().pattern(new RegExp(/(^(\+88|0088)?(01){1}[3456789]{1}(\d){8})$/)).required().messages({
                'string.pattern.base':'please provide a bangladeshi phone number'
            }),
            pin:Joi.string().min(6).max(6).required(),
            nid:Joi.string().required(),
            address: Joi.string().required(),
            kind: Joi.string().required(),
            balance:Joi.number().min(100).max(50000).required()

        });
          const validation = joiSchema.validate(req.body)
          if(validation.error){
                return res.status(500).send({
                success:false,
                message:validation.error.details[0].message,
                body:req.body,
            })
          }
          
         let {name,phone,pin,nid,address,kind,createdBy,balance}=req.body
         const accountTypes =['Admin','Merchant','Agent','Personal']
         const permissions =require("../PermissionDataset")
         const thisUserPermissions = permissions[req.authData.kind]
         if(!thisUserPermissions.creation.includes(kind)){
            return  res.status(404).send({
                success:false,
                message:'you do not have permission to create ' + kind,
                body:req.body
            })
         }
        
         if(!accountTypes.includes(kind)){
              return  res.status(404).send({
                success:false,
                message:'kind is Not  supported',
                body:req.body
            })

         }
         const user = await User.findOne({phone:phone})
          const salt = await bcrypt.genSalt(10)
          pin = await bcrypt.hash(pin,salt)
        if(!user){
            const newUser =new User({
                name:name,
                phone:phone,
                pin:pin,
                nid:nid,
                address:address,
                kind:kind,
                balance:balance,
                createdBy:req.authData._id
            })
            await newUser.save()
               return  res.status(200).send({
                success:true,
                message:"A new user is Created",
                data:{
                    name:name,
                    phone:phone
                }
            });
        }else{
                return res.status(404).send({
                success:false,
                message:"The user exist in our wallet",
                body:req.body
            });
        }
       
       
       
        
    } catch (error) {
           return res.status(500).send({
            success:false,
            message:error.message,
            tag:'Internal problem'
        })
    }
}

//Login
const Login =async(req,res)=>{
    try {
        const {pin,phone,kind}=req.body
          //find user
      const user =await User.findOne({
        phone:phone,
        kind:kind
      })
      if(!user){
       return  res.status(500).send({
        success:false,
        message:"Account not found",
        body:req.body
       })
      }
      const pinVerification =await bcrypt.compare(pin,user.pin)
      console.log(pinVerification);
      if(!pinVerification){
         return res.status(500).send({
            success:false,
            message:"Pin not match",
            body:req.body
           })
      }
      //User is verified
      //Jwt sign


    const tokenData={
        _id:user._id,
        name:user.name,
        phone:user.phone,
        kind:user.kind
    }
      const token =await jwt.sign(tokenData,process.env.JWT,{expiresIn:'1hr'})
       return res.status(200).send({
        success:true,
        message:"Login Successful",
        data:{
           authToken :token
        }
    });

    } catch (error) {
        return res.status(500).send({
            success:false,
            message:error.message,
            tag:'Internal problem'
        })
    }
}

module.exports={
    Register,
    Login
}