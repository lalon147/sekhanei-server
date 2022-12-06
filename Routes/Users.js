const express=require("express");
const { ObjectId } = require("mongodb");
const { verifyJwt, verifyAdmin } = require("../utils/authorization");
const { usersCollection } = require("../utils/database");
const Router=express.Router();
  


Router.get("/",verifyJwt,verifyAdmin,async(req,res)=>{
  const email=req.query.email;
  if(email=="seller"){
    const result=await usersCollection.find({role:"seller"}).toArray()
    return res.send(result); 
  }
  if(email=="user"){
    const result=await usersCollection.find({role:"user"}).toArray();
    return  res.send(result)
  }
  const result=await usersCollection.find({email:email}).toArray();
  res.send(result)
  
})
Router.get("/admin/:email",async(req,res)=>{
  const email=req.params.email;
  const query={email:email}
  const user=await  usersCollection.findOne(query);
  if(user?.seller_verified){
   return  res.send({role:user?.role,verify:user.seller_verified})
  }
  res.send({role:user?.role});
})
Router.delete("/:id",verifyJwt,verifyAdmin,async(req,res)=>{
  const id=req.params.id;
  const result=await usersCollection.deleteOne({_id:ObjectId(id)})
  res.send(result);
})
Router.post("/",async(req,res)=>{
      const user=req.body;console.log(user);
      const result=await usersCollection.insertOne(user);
      res.send(result);
})
Router.get("/:id",verifyJwt,verifyAdmin,async(req,res)=>{
     const id=req.params.id;
     const options={upsert:true}
     const query={_id:ObjectId(id)}
     const updatedDoc={
       $set:{
         seller_verified:true
       }
     }
     const result=await usersCollection.updateOne(query,updatedDoc,options)
     res.send(result);
})



module.exports=Router