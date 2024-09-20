const { validationResult } = require("express-validator");
const Users = require("../models/users.moduls");
const httpStatusText = require("../utils/httpStatusText");




const getUsers = async (req, res) => {
  const query = req.query;

  const limit = query.limit ||  10;
  const page = query.page || 1; 
  const  skip = (page - 1) * limit;
 
   
  console.log("🚀 ~ getUsers ~ query:", query)
  const users = await Users.find({}, {"__v": false}).limit(limit).skip(skip);
  res.json({status: httpStatusText.SUCCESS, data: {users}});
  console.log("🚀 ~ app.get ~ allUsers:");
};

const getUser = async (req, res) => {
  try {
    const user = await Users.findById(req.params.userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.json({status: httpStatusText.SUCCESS, data: {user}});
  } catch (err) {
    return res.status(400).json({status: httpStatusText.ERROR, data: null ,  message: err.message , code: 400 });

  }
};

const editUser = async (req, res) => {
  const userId = req.params.userId;
  const err = validationResult(req);

  try {
    const updatedUser = await Users.updateOne(
      { _id: userId },
      { $set: { ...req.body } }
    );
    if (!err.isEmpty()) {
      return res.status(400).json({status: httpStatusText.FAIL, data: err.array()});
    }
    res.status(200).json({status: httpStatusText.SUCCESS, data: {updatedUser}});
  } 
  catch {
    const errors = validationResult(req);
    return res.status(400).json({status: httpStatusText.ERROR, data: errors.array()});
  }
};

const addUser = async (req, res) => {
  const err = validationResult(req);
  const newUser = new Users(req.body);
  await newUser.save();
  if (!err.isEmpty()) {
    return res.status(400).json({status: httpStatusText.FAIL, data: err.array()});
  }

  res.status(201).json({status: httpStatusText.SUCCESS, data: {newUser}});
};

const deleteUser = async (req, res) => {
  await Users.deleteOne({_id: req.params.userId})
  res.json({status: httpStatusText.SUCCESS, data: null});
};

module.exports = {
  getUsers,
  getUser,
  editUser,
  addUser,
  deleteUser,
};
