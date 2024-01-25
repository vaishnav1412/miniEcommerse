const mongoose = require("mongoose")

const productSchema = new mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    
    price:{
        type:String,
        require:true
    },
    
    description:{
        type:String,
        require:true
    },
    image:{
        type:Array,
    },

},

{
    timestamps:true
}
)
module.exports=mongoose.model("product",productSchema)