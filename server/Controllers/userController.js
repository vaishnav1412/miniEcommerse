const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const User = require("../Models/userModel");
const { sendVerifymail } = require("../Config/nodeMailer");
const jwt = require("jsonwebtoken");
const ProductsDb = require("../Models/productModel");
const Cart = require("../Models/cartModel");
const orderDB = require("../Models/orderModel")
//reguster User ====

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const isExist = await User.findOne({ email });
  if (isExist) {
    return res
      .status(200)
      .send({ message: "user alredy exist", success: false });
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const userData = new User({
    name,
    email,
    password: hashedPassword,
  });

   await userData.save();

  res.status(200).send({ message: "user details saved", success: true });
});
//login User ===
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email: email });
  if (!user) {
    res.status(200).send({ message: "This User Not Exist", success: false });
  }

    const passwordCheck = await bcrypt.compare(password, user.password);
    if (!passwordCheck) {
      res.status(200).send({ message: "Password Not Match", success: false });
    } else {
      const token = jwt.sign(
        { id: user._id, name: user.name, role: "USER" },
        process.env.JWT_SECRET_USER,
        { expiresIn: "1d" }
      );
      res
        .status(200)
        .send({ message: "Successfully LoggedIn", success: true, data: token });
    }
 
});

//GetProduct details to front-End ===
const fetchProduct = asyncHandler(async (req, res) => {
  const id = req.userId;
  const user = await User.findOne({ _id: id });
  if (!user) {
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


//==ADDTOCART==//

const productToCart = asyncHandler(async (req, res) => {
  const id = req.userId;
  const user = await User.findOne({ _id: id });
  if (!user) {
    return res
      .status(200)
      .send({ message: "user does not exisr", success: false });
  } else {

    const { productId } = req.body;
    const product = await ProductsDb.findById({ _id: productId });
    if (!product) {
      res.status(200).send({ message: "product not exist", success: false });
    } else {
      const Usercart = await Cart.findOne({ user: user._id });
      if (!Usercart) {
        const addtoCart = new Cart({
          user: user._id,
          products: [{
            productId: productId,
            ProductName: product.name,
            price: product.price,
            image: product.image,
          }],
        });
        await addtoCart.save();
        res.status(200).send({ message: "added", success: true });
      } else {

        const productIndex = await Usercart.products.findIndex(
          (productItem) => productItem.productId == productId
        )
        if (productIndex !== -1) {

          await Cart.findOneAndUpdate(
            { user: user._id, "products.productId": productId },
            { $inc: { "products.$.quantity": 1 } }
          )
          return res.status(200).send({ message: "added", success: true });
        } else {

          await Cart.findOneAndUpdate(
            { user: user._id },
            {
              $push: {
                products: { productId: productId, price: product.price, ProductName: product.name, image: product.image },
              },
            }
          );
          return res.status(200).send({ message: "added", success: true });

        }
      }
    }
  }
})
const fetchCartData = asyncHandler(async (req, res) => {

  const id = req.userId;
  const user = await User.findOne({ _id: id });
  if (!user) {
    return res
      .status(200)
      .send({ message: "user does not exisr", success: false });
  } else {
    const cartData = await Cart.findOne({ user: user._id }).populate("products.productId")
    const cartDataProducts =cartData.products
    const totalPrice = cartData.products.reduce((acc, product) => {
      return acc + product.quantity * product.price;
    }, 0);
    res.status(200).send({ message: "fetched", success: true, data: cartDataProducts, totalPrice: totalPrice })
  }

})
//==DELETE CART ITEM==//
const itemDeleteFromCart = asyncHandler(async (req, res) => {
  const id = req.userId;
  const user = await User.findOne({ _id: id });
  if (!user) {
    return res
      .status(200)
      .send({ message: "user does not exisr", success: false });
  } else {
    const { productId } = req.body
    await Cart.findOneAndUpdate({ user: user._id }, {
      $pull: { products: { _id: productId } }
    })
    res
      .status(200)
      .send({ message: "user does not exisr", success: true });
  }
})
const placeTheOrder = asyncHandler(async (req, res) => {
  const id = req.userId;
  const user = await User.findOne({ _id: id });
  if (!user) {
    return res
      .status(200)
      .send({ message: "user does not exisr", success: false });
  } else {
    const { price, address, paymentmethod } = req.body
    const status = paymentmethod === "cashOnDelivery" ? "placed" : "pending"
    const usercart = await Cart.findOne({ user: user._id });
    const product = usercart.products
    const newOrder = new orderDB({
      user: user._id,
      username: user.name,
      paymentMethod: paymentmethod,
      products: product,
      totalAmount: price,
      status: status,
      address: address,
      Date: Date.now()
    })
    const ordersave = await newOrder.save()
    if (ordersave) {
      await Cart.deleteOne({ user: user._id })
      res.status(200).send({
        message: "Order Placed", success: true, payment: paymentmethod,
        data: ordersave, orderId: ordersave._id
      })
    }
  }
})


const onlinePayment = asyncHandler(async (req, res) => {
  const idbody = req.userId;
  const user = await User.findOne({ _id: idbody });
  if (!user) {
    return res
      .status(200)
      .send({ message: "user does not exisr", success: false });
  } else {
    const details = req.body


    const statusUpdated = await orderDB.findByIdAndUpdate(
      { _id: details.id, user: details.order.user },
      { $set: { status: "placed" } }
    );
    if (statusUpdated) {
      await orderDB.findByIdAndUpdate(
        { _id: details.id, user: details.order.user },
        { $set: { paymentId: details.payment.razorpay_payment_id } }
      )
      res
        .status(200)
        .send({ message: "done", success: true })
    }
  }
})

const cartIncrement = asyncHandler(async (req, res) => {

  const idbody = req.userId;
  const user = await User.findOne({ _id: idbody });
  if (!user) {
    return res
      .status(200)
      .send({ message: "user does not exisr", success: false });
  } else {
    const { id } = req.body
    await Cart.updateOne(
      { user: idbody, "products.productId": id._id },
      { $inc: { "products.$.quantity": 1 } }
    );

    return res
      .status(200)
      .send({ message: "user does not exisr", success: true })

  }
})

const cartDecrement = asyncHandler(async (req, res) => {

  const idbody = req.userId;
  const user = await User.findOne({ _id: idbody });
  if (!user) {
    return res
      .status(200)
      .send({ message: "user does not exist", success: false });
  } else {
    const { id } = req.body

    await Cart.updateOne(
      { user: idbody, "products.productId": id._id },
      { $inc: { "products.$.quantity": -1 } }
    )
    res
      .status(200)
      .send({ message: "ok", success: true })
  }
})


module.exports = {
  registerUser,
  loginUser,
  fetchProduct,
  productToCart,
  fetchCartData,
  itemDeleteFromCart,
  placeTheOrder,
  onlinePayment,
  cartDecrement,
  cartIncrement
};
