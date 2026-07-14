const express = require('express');
const router = express.Router();
const isLoggedin = require('../middleware/isLoggedin');
const {addtocart,showcart} = require('../controllers/cart');

router.post("/products/:id/cart", isLoggedin,addtocart);
router.get("/cart",isLoggedin,showcart);

module.exports = router;