const express = require("express")
const userRoute = express.Router()
const userAuth = require("../middleware/AuthUser")
const { registerUser, loginUser, fetchProduct, productToCart,
     fetchCartData, itemDeleteFromCart, placeTheOrder,
      onlinePayment,cartDecrement,cartIncrement } = require("../Controllers/userController")

userRoute.post("/register", registerUser)
userRoute.post("/login", loginUser)

userRoute.post('/fetchProduct', userAuth, fetchProduct)
userRoute.post('/addtocart', userAuth, productToCart)
userRoute.post('/fetchcartdata', userAuth, fetchCartData)
userRoute.post('/cartitemdelete', userAuth, itemDeleteFromCart)
userRoute.post('/placeorder', userAuth, placeTheOrder)
userRoute.post('/payment', userAuth, onlinePayment)
userRoute.post('/increment', userAuth, cartIncrement)
userRoute.post('/decrement', userAuth, cartDecrement)




module.exports = userRoute
