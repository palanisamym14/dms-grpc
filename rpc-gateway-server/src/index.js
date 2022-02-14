const express = require("express");
const bodyParser = require("body-parser");
require('dotenv').config();
const cors = require('cors')
const multer = require('multer');
const userController = require("./controller/user");
const fileManagerController = require("./controller/filemanager");
const verifyToken = require('./middleware/validatetoken');
const upload = multer({dest:'public/files'});

const app = express();


const corsOption = {
    credentials: true,
    methods: 'GET,HEAD,PUT,POST,DELETE',
    origin: true
};

app.use(cors(corsOption))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));
app.post("/signup", userController.create);
app.post("/login", userController.login);

app.post("/directory", verifyToken, fileManagerController.create);
app.put("/directory/rename", verifyToken, fileManagerController.rename);
app.get("/directory/:id", verifyToken, fileManagerController.findOne);
app.get("/directory", verifyToken, fileManagerController.findAll);
app.delete("/directory/:id", verifyToken, fileManagerController.delete);

app.post("/file/upload", upload.single('file'), verifyToken, fileManagerController.uploadFile);
app.get("/file/download/:id", verifyToken, fileManagerController.downloadFile);


const PORT = process.env.NODE_DOCKER_PORT || 8080;
app.listen(PORT, () => {
    console.log("Server running at port %d", PORT);
});