const express = require("express");
const UserRouter = express.Router();
const {
  RegisterUser,
  LoginUser,
  updateUser,
} = require("../controllers/user.controller");
UserRouter.post("/register", RegisterUser);
UserRouter.post("/login", LoginUser);
UserRouter.put("/:id", updateUser);
module.exports = UserRouter;
