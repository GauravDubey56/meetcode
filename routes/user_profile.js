const express = require("express");
const router = express.Router();
const {requestCollab} = require("../controllers/sendRequest")
const {auth, isLogedIn} = require("../Midlewares/auth")
const User = require('../models/user');
router.get("/:id", auth, isLogedIn, async (req, res, next) =>{
     const user = await User.findById(req.params.id);
     console.log(user)
     res.render("profile", {isLogedIn, auth}, user)

})



module.exports = router;