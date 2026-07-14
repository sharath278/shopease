const mongoose = require("mongoose");
const sampleProducts = require("./data.js");
const express = require("express");
const Product  = require("../models/products.js");


main()
.then(()=>{
    console.log("mongodb connected");
})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/ecommerce');
}

const addProducts = async(req,res)=>{
    await Product.deleteMany({});
    const allProducts = await Product.insertMany(sampleProducts);
    console.log(allProducts);
    res.send("data inserted successfully");

}

addProducts();