const Collab = require("../models/collab")
const User = require("../models/user")
const { auth, isLogedIn } = require('../Midlewares/auth.js');
const dotenv = require("dotenv");
var mongoose = require('mongoose');

dotenv.config({path: '../config/config.env'})
// @desc : email the admin about a request to collab from the user
// @route: /collab/join/:adminID 
// @params : :adminID we have the userId from req.user._id

exports.requestCollab = async (req, res, next) => {

     const contact = await req.user.username;
     const adminID = await  req.params.id;
     const admin = await User.findById(mongoose.Types.ObjectId(adminID))
     console.log(adminID)
     console.log(process.env.SENDGRID_API_KEY)
     const sgMail = require('@sendgrid/mail');
     sgMail.setApiKey(process.env.SENDGRID_API_KEY);
          const msg = {
          to: `${admin.username}`,
          from: "qliodev@gmail.com",
          subject: 'Request to collaborate',
          body: 'I Want to contribute to the mentioned project. Lets connect',
          html: `<strong>Hi, I am ${req.user.name}. I Want to contribute to the mentioned project. Lets connect. Ping me at @ ${contact}. </strong>`,
          };
     console.log(msg);
     sgMail
          .send(msg)
          .then(() => {
          console.log('Email sent')
          })
          .catch((error) => {
          console.error(error)
          })

     return res.redirect("/collab");
}