const express = require('express');
const jwt=require("jsonwebtoken");
const { usersCollection } = require('../utils/database');
const Router=express.Router();

 

Router.get("/",async(req,res)=>{
    const email=req.query.email;
    
    if(email){
        const token =jwt.sign({email},process.env.ACCESS_TOKEN,{expiresIn:"1h"})
        return res.send({token:token})            
    }
    res.status(403).send({message:"UNAUTHORIZED"})
})



module.exports=Router