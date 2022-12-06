const { ObjectID, ObjectId } = require("bson");
const express=require("express");
const { verifyJwt, verifyAdmin } = require("../utils/authorization");
const { categoriesCollection, carsCollection } = require("../utils/database");

const Router=express.Router();

Router.get("/",async(req,res)=>{
    const result=await categoriesCollection.find({}).toArray();
    res.send(result);
})
Router.post("/",verifyJwt,verifyAdmin,async(req,res)=>{
    const category=req.body;console.log(category);
    const result=await categoriesCollection.insertOne(category);
    res.send(result)
})
Router.get("/:id",verifyJwt,async(req,res)=>{
    const id=req.params.id;console.log(id);
    const car=await categoriesCollection.find({_id:ObjectId(id)}).project({company:1}).toArray();
    const name=car[0].company;console.log(car)
    const cars=await carsCollection.find({company:name}).toArray();
    res.send(cars);
})


module.exports=Router