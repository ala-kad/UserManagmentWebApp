const express = require("express");
const app = express ();
const port = 8080
app.listen(port, (req,res) => {
    // res.send(`Server is running on port: ${port}`);
    console.log(`Server is running on port: ${port}`);

})