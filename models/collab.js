const mongoose = require('mongoose');

const collabSchema = new mongoose.Schema({
  
  adminID: String,
  adminName: String,
  adminEmail: String,
  title: String,
  desc: String, 
  paused: Boolean,
  link: String,
  joinedUsersID: [String]
});

module.exports = mongoose.model("Collab", collabSchema);
