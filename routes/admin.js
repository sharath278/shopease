const express = require('express');
const router = express.Router();
const isLoggedin = require('../middleware/isLoggedin');
const isAdmin = require("../middleware/isAdmin");
const {adminPage, showorders, showOrder,updateStatus} = require("../controllers/admin");

router.get("/admin",isLoggedin,isAdmin,adminPage);
router.get("/admin/orders",isLoggedin,isAdmin,showorders);
router.get("/admin/orders/:id",isLoggedin,isAdmin,showOrder);
router.patch("/admin/orders/:id",isLoggedin,isAdmin,updateStatus);

module.exports = router;