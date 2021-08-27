const pool = require("../../utils/poolService.js");

const query = `insert into users (user_email, user_name, user_password)
 values (lower($1), lower($2), $3) returning user_id, user_name`;

const register = async (req, res) => {
  const { email, userName, password } = req.body;
  const values = [email, userName, password];
  try {
    const result = await pool.query(query, values);
    return res.status(201).json(result.rows);
  } catch (e) {
    console.error(e);
  }
};

module.exports = register;
