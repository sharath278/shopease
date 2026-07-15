const express = require('express');
const { checkoutOrder, getallOrders, getOrder } = require('../controllers/orders');
const isLoggedin = require("../middleware/isLoggedin");
const router = express.Router();

router.post("/order",isLoggedin,checkoutOrder);
router.get("/orders",isLoggedin,getallOrders);
router.get("/orders/:id",isLoggedin,getOrder);


module.exports = router;