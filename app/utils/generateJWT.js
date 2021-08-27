const jwt = require("jsonwebtoken");
require("dotenv").config();

function generateJWT(user_id) {
  const payload = {
    user: {
      id: user_id,
    },
  };

  return jwt.sign(payload, process.env.SECRET, { expiresIn: "2h" });
}

module.exports = generateJWT;
