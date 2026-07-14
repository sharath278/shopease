const express = require('express');
const router = express.Router();
const {getProducts,newproductForm,addProducts,viewProduct,editForm,editProduct,deleteProduct} = require("../controllers/products");
const isLoggedin = require('../middleware/isLoggedin');
const productValidataion = require("../middleware/productvalidation")
const isAdmin = require("../middleware/isAdmin");



router.put("/products/:id",isAdmin,productValidataion,editProduct);
router.get("/products",getProducts);
router.get("/products/new",isLoggedin,newproductForm);
router.post("/products",isAdmin,productValidataion,addProducts);
router.get("/products/:id",viewProduct);
router.get("/products/:id/edit",isLoggedin,editForm);
router.delete("/products/:id",isLoggedin,deleteProduct);

module.exports = router;