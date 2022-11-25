const mongoose =require("mongoose");

const connectDB = async () => {
try {
    const res = await mongoose.connect(process.env.MONGO_URL)
    if (res) {
        console.log("connected Successfully");
      }
   
  
   
} catch (error) {
    console.log(error)
}
};

module.exports =connectDB;