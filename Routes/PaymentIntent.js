const express=require('express');
const { verifyJwt } = require('../utils/authorization');
const stripe=require("stripe")(process.env.STRIPE_KEY)
const Router=express.Router();

const {paymentsCollections} =require("../utils/database");

Router.post("/",verifyJwt,async(req,res)=>{
    const booking=req.body;console.log(booking)
    const price=booking.carPrice;
    
    const paymentIntent=await stripe.paymentIntents.create({
        currency:"usd",
        amount:price,
        "payment_method_types":[
            "card"
        ]
    })

res.send({
    paymentIntent,
    clientSecret:paymentIntent.client_secret
}) 
 })




module.exports=Router;