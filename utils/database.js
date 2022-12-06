const { MongoClient, ServerApiVersion,ObjectId } = require('mongodb');
require("dotenv").config();
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.gw8hef2.mongodb.net/?retryWrites=true&w=majority`;
console.log(uri)//best practice
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


const categoriesCollection=client.db("cars").collection("categories");
const carsCollection=client.db("cars").collection("cars");
const usersCollection=client.db("cars").collection("users");
const bookingsCollection=client.db("cars").collection("bookings");
const commentsCollection=client.db("cars").collection("comments")
const paymentsCollection=client.db("cars").collection("payments");
const wishListCollection=client.db("cars").collection("wishList")
// const advertisementCollection=client.db("cars").collection("advertisement");
module.exports={
    wishListCollection,paymentsCollection,commentsCollection,categoriesCollection,carsCollection,usersCollection,bookingsCollection
}