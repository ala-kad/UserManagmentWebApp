const express = require("express");
const app = express ();
const helmet = require("helmet");
const connectDB = require("./config/db");
const UserRouter = require("./routes/UserRoutes");
const port = 8080

// MiddleWares
app.use(express.json()); //Parse json requests
app.use(helmet()) //Helmet can help protect your app from some well-known web vulnerabilities by setting HTTP headers appropriately.
app.use("/users" , UserRouter);

async function init (req, res) {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, (req,res) => {
        // res.send(`Server is running on port: ${port}`);
        console.log(`Server is running on port: ${port}`);
    })
}
init();
