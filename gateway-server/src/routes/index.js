const  express = require('express');
const router = express.Router();
const multer = require('multer');
const userController = require("../controller/user");
const fileManagerController = require("../controller/filemanager");
const verifyToken = require('../middleware/validatetoken');

const upload = multer({ dest: '../temp/files' });

// user api 
router.post("/signup", userController.create);
router.post("/login", userController.login);


// filemanager 
router.post("/directory", verifyToken, fileManagerController.create);
router.put("/directory/rename", verifyToken, fileManagerController.rename);
router.get("/directory/:id", verifyToken, fileManagerController.findOne);
router.get("/directory", verifyToken, fileManagerController.findAll);
router.delete("/directory/:id", verifyToken, fileManagerController.delete);

// file upload/ download routes 
router.post("/file/upload", upload.single('file'), verifyToken, fileManagerController.uploadFile);
router.get("/file/download/:id", verifyToken, fileManagerController.downloadFile);

module.exports = router;