const express = require("express");
const adminRoutes = express.Router();
const upload = require("../middleware/multer")
const authAdmin = require('../middleware/AuthAdmin')
const { adminLogin, addproduct, fetchProduct } = require("../Controllers/adminController");

adminRoutes.post("/adminLogin", adminLogin);

adminRoutes.post('/addproducts', authAdmin, upload.upload.array("image", 5), addproduct)
adminRoutes.post('/fetchProduct', authAdmin, fetchProduct)
module.exports = adminRoutes;

