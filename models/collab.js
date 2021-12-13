const mongoose = require('mongoose');

const collabSchema = new mongoose.Schema({
  adminID: String,
  adminName: String,
  title: String,
  desc: String, 
  paused: Boolean,
  maxLimit: Number,
  joinedUsersID: [String]
});

module.exports = mongoose.model("Collab", collabSchema);
