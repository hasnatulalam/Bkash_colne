const jwt =require("jsonwebtoken")

const authMiddleware =async(req,res,next)=>{
    try {
        const authHeader =req.headers['authorization']
    //Bearer
    const token =authHeader.split(' ')[1];
    jwt.verify(token,process.env.JWT,(error,user)=>{
        if(error){
           return res.status(401).send({
                success:false,
                message:"Invalid Token",
                data:{}
            })
        }
        req.authData= user
        next()
    })

        
    } catch (error) {
       return res.status(500).send({
            success:false,
            message:"Token is invalid",
            tag:"Internal"
        })
        
    }

    
   
}
module.exports =authMiddleware