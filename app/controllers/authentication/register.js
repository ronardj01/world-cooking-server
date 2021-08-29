const pool = require("../../utils/poolService.js");
const bcrypt = require("bcrypt");
const generateJWT = require("../../utils/generateJWT");
const authControl = require("../../utils/authControl");

const query = `insert into users (user_email, user_name, user_password)
 values (lower($1), lower($2), $3) returning user_id, user_name`;

const register = async (req, res) => {
  const { email, userName, password } = req.body;

  const control = await authControl(email, userName, password, "signup");

  if (!control) {
    return res.status(400).send("All the fields must be completed");
  }

  if (control == "user already exists") {
    return res.status(409).send("username or email already exists!");
  }

  const salt = await bcrypt.genSalt(10); //hash password before saving it to database
  const bcryptPassword = await bcrypt.hash(password, salt);

  const values = [email, userName, bcryptPassword];

  try {
    const result = await pool.query(query, values); //create a new user

    const newUserId = result.rows[0].user_id; //brings the new user id from the "returning" query
    const jwtToken = generateJWT(newUserId); //generate jwtToken using the newUserId

    res.cookie("token", jwtToken, { httpOnly: true }); //response the token in the cookies
    return res.status(201).json(result.rows);
  } catch (error) {
    console.log(error);
  }
};

module.exports = register;
