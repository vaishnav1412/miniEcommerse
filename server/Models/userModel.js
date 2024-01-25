const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({

    name:{
        type:String,
        require:true
    },
    
    email:{
        type:String,
        require:true
    },
    
    password:{
        type:String,
        require:true
    },
    
    isVerified:{
        type:Boolean,
        default:false
    },
    isAdmin: {
        type: Boolean,
        default: false,
      },

},

{
    timestamps:true
}
)
module.exports=mongoose.model("NewUser",userSchema)