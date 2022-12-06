const express = require('express');
const cors=require("cors");
const categoriesRoute=require("./Routes/Categories");
const usersRoute=require("./Routes/Users");
const bookingRoute=require("./Routes/Booking");
const commentsRoute=require("./Routes/Comments");
const carsRoute=require("./Routes/Cars");
const paymentIntentRoute=require("./Routes/PaymentIntent");
const paymentsRoute=require("./Routes/Payment");
const jwtRoute=require("./Routes/Jwt");
const wishListRoute=require("./Routes/WishList");
require("dotenv").config();
const stripe=require("stripe")('sk_test_51M6IHMCSwhlczGM7LmjvzDfGYu9bj4CSJzUrYbGIlphRutuKP9BSydslv9KzupDh5lNpEdPuGgOyBv1XNb6P9nUa008kxAbCNu')


const app=express();
app.use(cors());
app.use(express.json());


const port=process.env.PORT || 5000;

app.get("/",(req,res)=>{
    res.send("server running FROM VERCEL")
})

app.use("/cars",carsRoute)
app.use("/comments",commentsRoute)
app.use("/categories",categoriesRoute);
app.use("/users",usersRoute);
app.use("/booking",bookingRoute);
app.use("/create-payment-intent",paymentIntentRoute);
app.use("/payments",paymentsRoute);
app.use("/jwt",jwtRoute);
app.use("/wish-list",wishListRoute);




app.listen(port,()=>{
    console.log("SERVER IS RUNNING")
})