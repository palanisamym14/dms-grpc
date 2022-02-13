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

app.post("/directory", verifyToken, fileManagerController.create);
app.put("/directory/rename", verifyToken, fileManagerController.rename);
app.get("/directory/:id", verifyToken, fileManagerController.findOne);
app.get("/directory", verifyToken, fileManagerController.findAll);
app.put("/directory", verifyToken, fileManagerController.findOne);
app.delete("/directory", verifyToken, fileManagerController.findOne);
app.post("/file/upload", upload.single('file'), verifyToken, fileManagerController.uploadFile);
app.get("/file/download/:id", verifyToken, fileManagerController.downloadFile);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log("Server running at port %d", PORT);
});