const express =require("express")
const Transaction = require("../controller/transactionController")
const {Register, Login} = require("../controller/UserController")
const authMiddleware = require("../middleware/authMiddleware")
const router =express.Router()

router.get("/",(req,res)=>{
    res.send("Home url")
})

router.post("/register",authMiddleware, Register)
router.post("/login",Login)
router.post("/transaction",authMiddleware, Transaction)

module.exports =router