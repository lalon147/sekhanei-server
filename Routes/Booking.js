const express=require("express");
const { ObjectId } = require("mongodb");
const { verifyJwt } = require("../utils/authorization");
const { bookingsCollection } = require("../utils/database");

const Router=express.Router();

Router.get("/",verifyJwt,async(req,res)=>{
       const email=req.query.email;
       const result=await bookingsCollection.find({email:email}).toArray()
       res.send(result);
})
Router.get("/:id",verifyJwt,async(req,res)=>{
       const id=req.params.id;
       const result=await bookingsCollection.findOne({_id:ObjectId(id)})
       res.send(result);
})
Router.put("/:id",verifyJwt,async(req,res)=>{
       const id=req.params.id;console.log(id)
       const query={_id:ObjectId(id)};
       const options={upsert:true};
       const updatedDoc={
              $set:{
                     sold:true
              }
       }
       const result=await bookingsCollection.updateOne(query,updatedDoc,options);
       res.send(result);
})


Router.post("/",verifyJwt,async(req,res)=>{
       const booking=req.body;
       const result=await bookingsCollection.insertOne(booking);
       res.send(result);
})


module.exports=Router