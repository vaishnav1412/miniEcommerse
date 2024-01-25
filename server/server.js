const express = require("express")
const app = express()
const cors = require("cors")
const path = require("path")
require('dotenv').config()
const mongoConnect = require("./Config/mongoDB")
mongoConnect()


app.use(express.json())
app.use(cors())
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use("/user", require("./Routes/userRoutes"))
app.use("/admin", require("./Routes/adminRoutes"))

const port = process.env.PORT || 5000
app.listen(port, () => console.log(`server connected on port no ${port}`))