const express=require("express");
const { paymentsCollection } = require("../utils/database");
const Router=express.Router();

Router.post("/",async(req,res)=>{
    const payment=req.body;console.log(payment)
    const result=await  paymentsCollection.insertOne(payment)
    res.send(result);
})






module.exports=Router