const express = require("express");
const register = require("../controllers/authentication/register.js");
const login = require("../controllers/authentication/login.js");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);

module.exports = router;
