const express = require("express");
const {
  getProfile,
  addProfile,
  updateProfile,
  deleteProfile,
} = require("../controllers/profile.controller");
const ProfileRouter = express.Router();

ProfileRouter.get("/:id", getProfile); // pass the userid to getProfile
ProfileRouter.post("/:id", addProfile); // pass the userid to addProfile
ProfileRouter.put("/:id", updateProfile); // pass the userid to updateProfile
ProfileRouter.delete("/:id", deleteProfile); // pass the userid to deleteProfile

module.exports = ProfileRouter;
