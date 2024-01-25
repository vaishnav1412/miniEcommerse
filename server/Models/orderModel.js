const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Types.ObjectId,
    },
    username: {
      type: String,
      required: this.true,
    },
    paymentMethod: {
      type: String,
  },
  products: [
  {
      productId: {
          type: mongoose.Types.ObjectId,
          ref: "product",
          required: true,
      },
      quantity: {
          type: Number,
          required: true,
      },
  }],

    totalAmount: {
      type: Number,
    },
    status :{
      type : String
  },

    paymentId :{
      type : String
  },
  address :{
    type : String
},

    Date: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("order", orderSchema);
