const express = require("express");
const { handleUserSignup, handleUserLogin } = require("../controllers/user");
// const {restrictLoggedUser} = require("./middleware/auth");

const router = express.Router();

router.post("/signup", handleUserSignup);
router.post("/login", handleUserLogin);

module.exports = router;
