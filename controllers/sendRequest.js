const Collab = require("../models/collab")
const User = require("../models/user")
const { auth, isLogedIn } = require('../Midlewares/auth.js');
const dotenv = require("dotenv");
var mongoose = require('mongoose');
const fetch = require('node-fetch')
dotenv.config({path: '../config/config.env'})
// @desc : email the admin about a request to collab from the user
// @route: /collab/join/:adminID 
// @params : :adminID we have the userId from req.user._id

exports.requestCollab = async (req, res, next) => {

     const contact = await req.user.username;
     const adminID = await  req.params.id;
     const admin = await User.findById(mongoose.Types.ObjectId(adminID))
     console.log(adminID)
     fetch(`https://otp--flask-api.herokuapp.com/request?res=${admin.username}&sender=${contact}`)
     return res.redirect("/collab");
}