const express = require('express');
const { verifyJwt } = require('../utils/authorization');
const { wishListCollection } = require('../utils/database');

const Router=express.Router();

Router.post("/",verifyJwt,async(req,res)=>{
    const car=req.body;
    const result=await wishListCollection.insertOne(car)
    res.send(result) 
})
Router.get("/",async(req,res)=>{
    const email=req.query.email;
    const result=await wishListCollection.find({bookedBy:email}).toArray();
    res.send(result);
})



module.exports=Router;