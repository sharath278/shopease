const express = require('express');
const { checkoutOrder } = require('../controllers/orders');
const router = express.Router();

router.post("/order",checkoutOrder);

module.exports = router;