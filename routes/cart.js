const express = require('express');
const router = express.Router();
const isLoggedin = require('../middleware/isLoggedin');
const {addtocart,showcart, increaseQuantity, decreaseQuantity,removeItem} = require('../controllers/cart');

router.post("/products/:id/cart", isLoggedin,addtocart);
router.get("/cart",isLoggedin,showcart);
router.patch("/cart/:productid/increase",isLoggedin,increaseQuantity);
router.patch("/cart/:productid/decrease",isLoggedin,decreaseQuantity);
router.delete("/cart/:productid",isLoggedin,removeItem)


module.exports = router;