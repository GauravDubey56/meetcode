const express = require("express");
const router = express.Router();
const session = require('express-session');
const passport = require('passport');
const { auth, isLogedIn } = require('../Midlewares/auth.js');
const User = require("../models/user");


//actual routes
router.get("/",isLogedIn, (req, res) => {
  res.render("login", {isLogedIn: req.isLogedIn});
});

router.get("/logout", isLogedIn, (req, res) => {
  req.logout();
  console.log('logged out')
  res.redirect("/");
})
router.post("/", (req, res) => {
  const user = new User({
    username: req.body.username,
    password: req.body.password
  });

  req.login(user, (err) => {
    if(err){
      console.log(err);
    }else{
      console.log("LoggedIn")
      passport.authenticate("local")(req, res, () => {
        if(typeof(req.session.redirectedFrom) != 'undefined'){
            console.log("redirected from defined")
            res.redirect("/");
        }else{
          console.log("redirected from undefined")
          res.redirect("/");
        }  
      });
    }
  });
});

router.get("/register",isLogedIn, (req, res) => {

    res.render("register", {isLogedIn: req.isLogedIn});
});

router.post("/register",  (req, res) => {
  const name = req.body.name;
  const userName = req.body.username;
  const password = req.body.password;
  const email = req.body.email;
  User.register({username: userName, email: email}, password, async (err, user) => {
    if(err){
      console.log(err);
      res.redirect("/auth/register");
    }else{
      user.name = name;
      user.save();
      const users = await User.find();
      passport.authenticate("local")(req, res, () => {
        if(typeof(req.session.redirectedFrom) != 'undefined'){
            res.redirect(req.session.redirectedFrom);
        }else{
          res.redirect("/");
        }
      });
    }
  });
});


//testing 
router.get("/test", (req, res) => {
  res.send("without login")
})
router.get("/getUsers", async (req, res) => {
  const user = await User.find();
  console.log(user)
  return res.status(200).json({data : user});
})



module.exports = router;
