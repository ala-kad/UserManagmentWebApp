const mongoose = require("mongoose");
require("dotenv").config();

const connectDB = (url) => {
    return mongoose.connect(url , {
        useNewUrlParser: true,
        useUnifiedTopology:true,
    })
    .then( () => {
        console.log(`App is connected to DB successfully ${url}`);
    })
    .catch((err) => {
        console.log(`err ${err}`);
    })
}
// Exporting file as a module
module.exports = connectDB;