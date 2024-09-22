const express = require("express");
const {validationSchema} =  require('../middlewares/middlewareSchema');
const UsersController = require("../controllers/users.contorller");
const verifyToken  = require('../middlewares/verifyToken');

const router = express.Router();

router
  .route("/")
  .get(verifyToken ,UsersController.getUsers)
  .post(UsersController.addUser);

router
  .route("/:userId")
  .get(UsersController.getUser)
  .post(UsersController.login)
  .put(validationSchema() ,UsersController.editUser)
  .delete(UsersController.deleteUser);

module.exports = router;
 