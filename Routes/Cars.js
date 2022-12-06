const express=require("express");
const { ObjectId } = require("mongodb");
const { verifyJwt } = require("../utils/authorization");
const { carsCollection } = require("../utils/database");
const Router=express.Router();

Router.post("/",verifyJwt,async(req,res)=>{
    const car=req.body;console.log(car)
    const result=await carsCollection.insertOne(car);
    res.send(result);})

Router.get("/",async(req,res)=>{
    const email=req.query.email;
    const result=await carsCollection.find({seller_email:email}).toArray();
    res.send(result);

})
Router.post("/verify-seller",async(req,res)=>{
    const email=req.query.email;
    const options={upsert:true};
    const query={seller_email:email}
    const updatedDoc={
        $set:{
            seller_verified:true
        }
    }
    const result=await carsCollection.updateMany(query,updatedDoc,options);
    res.send(result);
})
Router.get("/advertise",async(req,res)=>{
    const query={sold:false};
    const result=await  carsCollection.find(query).toArray();
    res.send(result);
})
Router.get("/:id",async(req,res)=>{
    const id=req.params.id;
    const query={_id:ObjectId(id)};
    const options={upsert:true};
    const updatedDoc={
           $set:{
                  sold:false,
                  advertise:true
           }
    }
    const result=await carsCollection.updateOne(query,updatedDoc,options);
    res.send(result);
})
Router.put("/:id",async(req,res)=>{
    const id=req.params.id;console.log(id)
    const query={_id:ObjectId(id)};
    const options={upsert:true};
    const updatedDoc={
           $set:{
                  sold:true,
                  advertise:false
           }
    }
    const result=await carsCollection.updateOne(query,updatedDoc,options);
    res.send(result);
})
Router.delete("/:id",async(req,res)=>{
    const id=req.params.id;
    const result=await carsCollection.deleteOne({_id:ObjectId(id)})
    res.send(result);
})




module.exports=Router