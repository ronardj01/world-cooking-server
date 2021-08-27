const pool = require("../../utils/poolService.js");
const bcrypt = require("bcrypt");
const generateJWT = require("../../utils/generateJWT");

const query = `insert into users (user_email, user_name, user_password)
 values (lower($1), lower($2), $3) returning user_id, user_name`;

const register = async (req, res) => {
  const { email, userName, password } = req.body;

  const salt = await bcrypt.genSalt(10); //hash password before saving it to database
  const bcryptPassword = await bcrypt.hash(password, salt);

  const values = [email, userName, bcryptPassword];

  try {
    const result = await pool.query(query, values);

    const newUserId = result.rows[0].user_id; //brings the new user id from the "returning" query
    const jwtToken = generateJWT(newUserId); //generate jwtToken using the newUserId

    res.cookie("token", jwtToken, { httpOnly: true });
    return res.status(201).json(result.rows);
  } catch (e) {
    console.error(e);
  }
};

module.exports = register;
