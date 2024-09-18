const { validationResult } = require("express-validator");
const { Users } = require("../data/data");

const getUsers = (req, res) => {
  res.json(Users);
  console.log("🚀 ~ app.get ~ allUsers:");
};

const getUser = (req, res) => {
  const userId = +req.params.userId;
  const user = Users.find((user) => user.id === userId);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  res.json(user);
};

const editUser = (req, res) => {
  const userId = +req.params.userId;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  let user = Users.find((user) => user.id === userId);

  user = { ...user, ...req.body };

  res.status(200).json(user);
};

const addUser = (req, res) => {
  const err = validationResult(req);

  if (!err.isEmpty()) {
    return res.status(400).json({ errors: err.array() });
  }
  const user = { id: Users.length + 1, ...req.body };

  Users.push(user);

  res.status(201).json(user);
};


const deleteUser = (req, res) => {
  const userId = +req.params.userId;
  const delUser = Users.find((user) => user.id === userId);
  if (!delUser) {
    return res.status(404).json({ msg: "user is del" });
  }
  const index = Users.indexOf(delUser);
  Users.splice(index, 1);
  res.json({ msg: "user is del" });
};


module.exports ={
    getUsers,
    getUser,
    editUser,
    addUser,
    deleteUser
}