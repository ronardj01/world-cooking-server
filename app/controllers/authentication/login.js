const bcrypt = require("bcrypt");
const generateJWT = require("../../utils/generateJWT");
const authControl = require("../../utils/authControl");

const login = async (req, res) => {
  const { email, password } = req.body;

  const control = await authControl(email, password, "login");

  if (!control) {
    return res.status(400).json({
      error: "All the fields must be completed",
      isAuthenticated: false,
    });
  }

  if (!control.user_email) {
    return res
      .status(401)
      .json({ error: "email does not exist", isAuthenticated: false });
  }

  const isValidPassword = await bcrypt.compare(password, control.user_password); //compare the password with the password hashed in database

  if (!isValidPassword) {
    return res
      .status(401)
      .json({ error: "Invalid password", isAuthenticated: false });
  }

  const userId = control.user_id;
  const jwtToken = generateJWT(userId); //generate jwtToken using the userId

  res.cookie("token", jwtToken, { httpOnly: true }); //response token in the cookies
  return res.status(200).json({ isAuthenticated: true });
};

module.exports = login;
