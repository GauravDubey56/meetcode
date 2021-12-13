const Collab = require("../models/collab")
const User = require("../models/user")
const { auth, isLogedIn } = require('../Midlewares/auth.js');
const dotenv = require("dotenv");
dotenv.config({path: '../config/config.env'})
// @desc : email the admin about a request to collab from the user
// @route: /collab/join/:adminID 
// @params : :adminID we have the userId from req.user._id

exports.requestCollab = (req, res, next) => {
     const contact = req.user.username;
     const admin = req.params.id;
     console.log(process.env.SENDGRID_API_KEY)
     const sgMail = require('@sendgrid/mail');
     sgMail.setApiKey(process.env.SENDGRID_API_KEY);
          const msg = {
          to: "dubeygaurav0506@gmail.com",
          from: "qliodev@gmail.com",
          subject: 'Request to collaborate',
          body: 'I Want to contribute to the mentioned project. Lets connect',
          html: '<strong>Find your perfect code partner at MeetCode</strong>',
          };
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