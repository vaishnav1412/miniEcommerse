const mongoose =require('mongoose')


const cartSchema =new mongoose.Schema({
    user:{
        type:mongoose.Types.ObjectId,
        ref:'user',
        required:true
    },
    products: [{
           productId:{ type:mongoose.Types.ObjectId,
        ref:'product',
        require:true
    },
        ProductName: {
          type: String,
          required: true,
        },
        quantity: {
          type: Number,
          default: 1,
        },
        price: {
          type: Number,
          default: 0,
        },
        image: {
          type: Array,
        },
      }],
    Date: {
        type: Date,
      },

    

},{
    timestamps:true
})

module.exports=mongoose.model("cart",cartSchema)