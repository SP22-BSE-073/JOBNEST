const mongoose = require("mongoose");

const jobSeekerSchema = new mongoose.Schema({
  Name: { type: String, required: true },
  Email: { type: String, required: true, unique: true },
  Password: { type: String, required: true },
  Phone: { type: String },
  Resume: { type: String },
  ProfilePicture: { type: String }
});

module.exports = new mongoose.model("JobSeekers", jobSeekerSchema);
