const Collab = require("../models/collab")
const { auth, isLogedIn } = require('../Midlewares/auth.js');
const dotenv = require("dotenv");
dotenv.config({path: '../config/config.env'})
//@desc get available collab invites
//@route GET /collab/
exports.getCollabs = async (req, res, next) => {
     try {
          console.log(process.env.secret)
          const currentCollabs = await Collab.find();

          res.render("collab", {isLogedIn: req.isLogedIn, collabs : currentCollabs})
     } catch(err) {
          return res.status(500).json({
          success : false,
          error: 'Server error'
          })     
     }

}

exports.newCollab = async (req, res, next) => {
     try{
          console.log(isLogedIn)
          res.render("createQueue", {isLogedIn: req.isLogedIn})
     } catch(err) {

     }
}
exports.postCollab = async (req, res, next) => { 
     console.log(req.user._id);
     console.log(req.params.id);
     
     try{
          const newCollab = await new Collab({
               adminID: req.user._id,
               adminName: req.user.name,
               title: req.body.title,
               desc: req.body.desc,
               paused: false,
               maxLimit: req.body.maxLimit,
               joinedUsersID: []
          });
             newCollab.save((err) => {
               if(err){
                 console.log(err);
                 return res.status(400).json({
                      success: false,
                      error: 'Could not create document'
                 })
               }else{
                 console.log(newCollab)
                 console.log(req.isLogedIn)
                 res.render("createQueue", {isLogedIn: req.isLogedIn})
               }
             });
     }
     catch(err){
          if(err = "TypeError: Cannot read property '_id' of undefined"){
               console.log("inside if block")
          }
          console.log(err)
          return res.status(500).json({
               success: false,
               error: "Server error"
          });
     }
}

exports.deleteCollab = () => {
     console.log("delete collab")
}