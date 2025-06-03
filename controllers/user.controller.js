const UserModel = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const RegisterUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = await UserModel.findOne({ email });
    if (user) {
      return res.status(400).json("User already exists");
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = await UserModel.create({
      name,
      email,
      password: hashedPassword,
    });
    return res.status(201).json(newUser);
  } catch (error) {
    return res.status(500).json(error);
  }
};

const LoginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(404).json("User not found");
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json("Invalid credentials");
    }
    const token = jwt.sign(
      { user: { _id: user._id, name: user.name, email: user.email } },
      process.env.JWT_SECRET,
      {
        expiresIn: "6h",
      }
    );
    res.status(200).json({ message: "Successfully Logged In!", token });
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
};

const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedUser = await UserModel.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!updatedUser) {
      return res.status(404).json("User not found");
    }
    return res.status(200).json(updatedUser);
  } catch (error) {
    return res.status(500).json(error);
  }
};

module.exports = {
  RegisterUser,
  LoginUser,
  updateUser,
};
