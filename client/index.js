const express = require("express");
const bodyParser = require("body-parser");
const userController = require("./controller/user");
const fileManagerController = require("./controller/filemanager");
const verifyToken = require('./middleware/index');

const multer = require('multer');
const upload = multer({dest:'public/files'});

const app = express();
require('dotenv').config();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));
app.post("/signup", userController.create);
app.post("/login", userController.login);

app.post("/directory", upload.single('content'), verifyToken, fileManagerController.create);
app.get("/directory/:id", verifyToken, fileManagerController.findOne);
app.get("/directory", verifyToken, fileManagerController.create);
app.put("/directory", verifyToken, fileManagerController.findOne);
app.delete("/directory", verifyToken, fileManagerController.findOne);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log("Server running at port %d", PORT);
});