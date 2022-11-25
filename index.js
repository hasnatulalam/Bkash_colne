const express =require("express")
const app =express()
const dotenv =require("dotenv")
dotenv.config()
const db=require("./db")
const connectDB = require("./db")
const api =require("./app/routes/api")

app.use(express.json({limit:'50mb'}))
app.use(express.urlencoded({extended:true,limit:'50mb'}))
const seeder =require('./app/Seeder')

const PORT = process.env.PORT || 5000;
connectDB()



app.use("/api/v1",api)


app.listen(5000, () => {
    console.log(`APi is Running on http://localhost:${PORT}`);
  });
  seeder.seedUser()


