const express = require('express');
const { verifyJwt } = require('../utils/authorization');
const { commentsCollection } = require('../utils/database');
const Router=express.Router();

Router.post("/",verifyJwt,async(req,res)=>{
    const comment=req.body;
    const result=await commentsCollection.insertOne(comment);
    res.send(result); 
})
Router.get("/",async (req,res)=>{
    const result=await commentsCollection.find({}).toArray();
    res.send(result);
})




module.exports=Router