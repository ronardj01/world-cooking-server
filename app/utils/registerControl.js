const pool = require("./poolService");

const registerControl = async (email, userName, password) => {
  let control = true;

  const query = `select user_name, user_email from users where 
  user_name = $1 or user_email = $2`;

  if (!email || !userName || !password) {
    control = false;
  } else {
    const data = await pool.query(query, [userName, email]);
    const userData = data.rows[0];

    if (userData.user_name == userName || userData.user_email == email) {
      control = "user already exists";
    }
  }
  return control;
};

module.exports = registerControl;
