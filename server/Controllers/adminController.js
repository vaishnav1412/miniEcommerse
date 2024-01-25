const User = require("../Models/userModel");
const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const sharp = require("sharp");
const bcrypt = require("bcrypt");
const ProductsDb = require("../Models/productModel");
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.cloud_name,
  api_key: process.env.api_key,
  api_secret: process.env.api_secret,
  secure: true,
});

// adminlogin =======

const adminLogin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const admin = await User.findOne({ email });
  if (!admin) {
    res.status(200).send({ message: "User Not exist", success: false });
  }
  if (admin.isVerified && admin.isAdmin) {
    const passwordCheck = await bcrypt.compare(password, admin.password);
    if (!passwordCheck) {
      res.status(200).send({ message: "Password Wrong", success: false });
    } else {
      const token = jwt.sign(
        { id: admin._id, name: admin.name, role: "ADMIN" },
        process.env.JWT_SECRET_ADMIN,
        { expiresIn: "1d" }
      );
      res
        .status(200)
        .send({ message: "Successfully LoggedIn", success: true, data: token });
    }
  } else {
    res.status(200).send({ message: "This User Not vlaid", success: false });
  }
});

//addProducts =========

const addproduct = asyncHandler(async (req, res) => {
  const id = req.adminId;
  const admin = await User.findOne({ _id: id });
  if (!admin) {
    return res
      .status(200)
      .send({ message: "user does not exisr", success: false });
  } else {
    const imagepath = req.files[0].filename;
    await sharp("./public/multer/" + imagepath)
      .resize(500, 500)
      .toFile("./public/cloudinary/" + imagepath);

    const data = await cloudinary.uploader.upload(
      "./public/cloudinary/" + imagepath
    );
    const cdurl = [data.secure_url];
    const { name, price, description, image } = req.body;
    const productdata = new ProductsDb({
      name,
      price,
      description,
      image: cdurl,
    });
    const saveProductData = productdata.save();
    if (saveProductData) {
      res.status(200).send({ message: "added to database", success: true });
    }
  }
});



//GetProduct details to front-End ===
const fetchProduct = asyncHandler(async (req, res) => {
  const id = req.adminId;
  const admin = await User.findOne({ _id: id });
  if (!admin) {
    return res
      .status(200)
      .send({ message: "user does not exisr", success: false });
  } else {
    const productData = await ProductsDb.find();
    res
      .status(200)
      .send({ message: "fetched", success: true, data: productData });
  }
});
module.exports = {
  adminLogin,
  addproduct,
  fetchProduct

};
