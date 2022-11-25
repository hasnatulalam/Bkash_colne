
const User =require("./model/User")
const bcrypt =require("bcrypt")

  async function  seedUser(){
    let pin ="123456"
    const salt =await bcrypt.genSalt(10)
     pin =await bcrypt.hash(pin,salt)
    const dataToSeed ={
        'name':'Hasnatul Alam',
        'phone':'01852730124',
        'pin':pin,
        'address':'Chittagong',
        'nid':'01623480030',
        'kind':'Admin',
        'balance':10000000
    }
    
    const user = await User.findOne({phone:dataToSeed.phone})
    if(!user){
        const newUser = new User(dataToSeed)
        
        await newUser.save(newUser)
        await  User.findOneAndUpdate(
            {phone:dataToSeed.phone},
            {$set:{
                createdBy:newUser._id
            }},
            {new:true}
         )
    }
  
}
module.exports ={seedUser}