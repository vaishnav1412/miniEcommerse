const mongoose = require("mongoose")

const mongoConnect = async()=>{
    try {
        const dbconnect = await mongoose.connect(process.env.MONGO_URL)
        console.log('Database connected successfully on', dbconnect.connection.name)
        
    } catch (error) {
        console.log(error);
        process.exit(1)
        
    }
}

module.exports=mongoConnect