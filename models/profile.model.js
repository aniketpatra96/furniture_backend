const mongoose = require("mongoose");

const ProfileSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    avatar: {
      type: String,
      default: null,
      required: false,
    },
    address: {
      type: String,
      default: null,
      required: false,
    },
    mobile: {
      type: String,
      default: null,
      required: true,
    },
  },
  { timestamps: true }
);

const ProfileModel = new mongoose.model("Profile", ProfileSchema);

module.exports = ProfileModel;
