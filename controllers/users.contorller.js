const { validationResult } = require("express-validator");
const Users = require("../models/users.moduls");
const httpStatusText = require("../utils/httpStatusText");
const asyncWrapper = require("../models/asyncWrapper");
const appError = require('../utils/appError');

const getUsers = asyncWrapper(async (req, res) => {
  const query = req.query;

  const limit = query.limit || 10;
  const page = query.page || 1;
  const skip = (page - 1) * limit;

  console.log("🚀 ~ getUsers ~ query:", query);
  const users = await Users.find({}, { __v: false }).limit(limit).skip(skip);
  res.json({ status: httpStatusText.SUCCESS, data: { users } });
  console.log("🚀 ~ app.get ~ allUsers:");
});

const getUser = asyncWrapper(async (req, res, next) => {
  const user = await Users.findById(req.params.userId);
  if (!user) {
    const error = appError.create(
      "the user not found",
      404,
      httpStatusText.FAIL
    );
    return next(error);
  }
  return res.json({ status: httpStatusText.SUCCESS, data: { user } });
});

const editUser = asyncWrapper(async (req, res) => {
  const userId = req.params.userId;
  const err = validationResult(req);

  const updatedUser = await Users.updateOne({ _id: userId },{ $set: { ...req.body } });
  if (!err.isEmpty()) {
    const error = appError.create(err.array(), 400, httpStatusText.FAIL);
    return next(error);
  }
  res.status(200).json({ status: httpStatusText.SUCCESS, data: { updatedUser } });

});

const addUser = asyncWrapper(async (req, res) => {
  const err = validationResult(req);
  if (!err.isEmpty()) {
    const error  = appError.create(err.array(), 400, httpStatusText.FAIL);
    return next(error)
  }
  
  const newUser = new Users(req.body);
  await newUser.save();
  res.status(201).json({ status: httpStatusText.SUCCESS, data: { newUser } });
});

const deleteUser = asyncWrapper(async (req, res) => {
  await Users.deleteOne({ _id: req.params.userId });
  res.json({ status: httpStatusText.SUCCESS, data: null });
})

module.exports = { 
  getUsers,
  getUser,
  editUser,
  addUser,
  deleteUser,
};
