const express = require("express");
const { validationSchema } = require("../middlewares/middlewareSchema");
const productController = require("../controllers/products.contorller");
const verifyToken = require("../middlewares/verifyToken");
const userRoles = require("../utils/usersRoles");
const allowedTo = require("../middlewares/allowedTo");
const multer = require('multer');
const appError = require("../utils/appError");


const deskStorge = multer.diskStorage({
  destination : function(req, file,  cb) {
    
    console.log("🚀 ~ file:", file)
    cb(null, 'uploads')
  },
  filename : function(req, file, cb) {
    const ext = file.mimetype.split('/')[1]
    const fileName = `user-${Date.now()}.${ext}`
    cb(null, fileName)
  }


})

const fileFilter= (req, file, cb) =>{
  const ext = file.mimetype.split('/')[0]
  if(ext === 'image'){
    return cb(null, true)
  }
  else{ 
    return cb(appError.create('this type of file is not  allowed', 400), false)

  }

}

const upload = multer({ storage: deskStorge, fileFilter})


const router = express.Router();

// router
//   .route("/:userId")
//   // .get(productController.getUser)
//   .put(validationSchema(), productController.editProduct)
//   .delete(
//     verifyToken,
//     allowedTo(userRoles.ADMIN, userRoles.MODERATOR),
//     productController.deleteProduct
//   );

// router.route("/login").post(productController.login);
  
router.route("/").get(productController.getProducts);

router.route("/getProduct/:productId").get( productController.getProduct);

router.route("/addProduct").post(upload.single('productImage') , productController.addProduct);

// router.route("/addUser").post(upload.single('avatar') ,productController.addProduct);

module.exports = router;
 