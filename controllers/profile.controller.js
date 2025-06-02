const { mongoose } = require("mongoose");
const ProfileModel = require("../models/profile.model");
const UserModel = require("../models/user.model");
module.exports = {
  getProfile: async (req, res) => {
    try {
      const profile = await ProfileModel.find({ userId: req.params.id });
      if (!profile) {
        return res.status(404).json("Profile not found");
      }
      return res.json(profile[0]);
    } catch (error) {
      return res.status(500).json("Failed to get profile due to " + error);
    }
  },
  addProfile: async (req, res) => {
    try {
      const id = req.params.id;
      const existingProfile = await ProfileModel.findOne({
        userId: id,
      });
      if (existingProfile) {
        return res.status(409).json("Profile already exists");
      }
      const user = await UserModel.findById(id);
      if (!user) {
        return res.status(404).json("User not found");
      }
      req.body.userId = user._id;
      const newProfile = new ProfileModel(req.body);
      await newProfile.save();
      return res.status(201).json("Profile created successfully!");
    } catch (error) {
      return res.status(500).json("Failed to create profile due to " + error);
    }
  },
  updateProfile: async (req, res) => {
    try {
      const id = req.params.id;
      const existingUser = await UserModel.findById(id);
      if (!existingUser) {
        req.body.userId = String(existingUser._id);
        const newProfile = new ProfileModel(req.body);
        await newProfile.save();
        return res.status(404).json(newProfile);
      }
      req.body.userId = String(existingUser._id);
      const profileDetails = await ProfileModel.find({
        userId: String(existingUser._id),
      });
      req.body.userId = String(profileDetails[0].userId);
      const updatedProfile = await ProfileModel.findByIdAndUpdate(
        String(profileDetails[0]._id),
        req.body,
        { new: true }
      );
      if (!updatedProfile) {
        return res.status(404).json("Profile not found");
      }
      return res.json(updatedProfile);
    } catch (error) {
      return res.status(500).json("Failed to update profile due to " + error);
    }
  },
  deleteProfile: async (req, res) => {
    try {
      const id = req.params.id;
      const existingUser = await UserModel.findById(id);
      if (!existingUser) {
        return res.status(404).json("User not found");
      }
      const profileDetails = await ProfileModel.find({
        userId: String(existingUser._id),
      });
      const deletedProfile = await ProfileModel.findByIdAndDelete(
        String(profileDetails[0]._id)
      );
      if (!deletedProfile) {
        return res.status(404).json("Profile not found");
      }
      return res.json("Profile deleted successfully!");
    } catch (error) {
      return res.status(500).json("Failed to delete profile due to " + error);
    }
  },
};
