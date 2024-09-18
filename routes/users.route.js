const express = require("express");
const {validationSchema} =  require('../middlewares/middlewareSchema');
const UsersController = require("../controllers/users.contorller");

const router = express.Router();

router
  .route("/")
  .get(UsersController.getUsers)
  .post(validationSchema(),UsersController.addUser);

router
  .route("/:userId")
  .get(UsersController.getUser)
  .put(validationSchema() ,UsersController.editUser)
  .delete(UsersController.deleteUser);

module.exports = router;
