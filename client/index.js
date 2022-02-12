const express = require("express");
const bodyParser = require("body-parser");
const userController = require("./controller/user");

const app = express();
require('dotenv').config();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.post("/signup", userController.create);
app.post("/login", userController.findOne);
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log("Server running at port %d", PORT);
});