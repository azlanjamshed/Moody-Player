require("dotenv").config()
const { connect } = require("mongoose")
const app = require("./src/app")
const connectDB = require("./src/db/db")



connectDB()

app.listen(3000, () => {
    console.log("Server started at 3000");

})