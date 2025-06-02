const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

const UserModel = new mongoose.model("User", userSchema);

module.exports = UserModel;
