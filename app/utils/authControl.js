const pool = require("./poolService");

const authControl = async (email, userName, password, authType) => {
  let control = true;
  let isAllFieldCompleted = true;

  const query = `select user_name, user_email from users where 
  user_name = $1 or user_email = $2`;

  const isSignupType = authType == "signup" ? true : false;

  if (isSignupType) {
    isAllFieldsCompleted = email && userName && password ? true : false;
  } else {
    isAllFieldsCompleted = userName && password ? true : false;
  }

  if (!isAllFieldsCompleted) {
    control = false;
  } else {
    const data = await pool.query(query, [userName, email]);

    if (data.rowCount > 0) {
      const userData = data.rows[0];

      if (userData.user_name == userName || userData.user_email == email) {
        return "user already exists";
      }
    }
  }
  return control;
};

module.exports = authControl;
