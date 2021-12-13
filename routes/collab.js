const express = require("express");
const router = express.Router();
const {getCollabs, postCollab, deleteCollab, newCollab} = require("../controllers/collabs")
const {requestCollab} = require("../controllers/sendRequest")
const {auth, isLogedIn} = require("../Midlewares/auth")
router
     .route("/")
     .get(auth, isLogedIn, getCollabs)
// router.get("/", auth, isLogedIn, getCollabs);

router
     .route("/new")
     .get(auth, isLogedIn, newCollab)
     .post(auth, isLogedIn, postCollab)
router
     .route("/request/:id")
     .post(auth, isLogedIn, requestCollab)
router
     .route("/:id")
     .delete(auth, isLogedIn, deleteCollab)

module.exports = router