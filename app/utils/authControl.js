const pool = require("./poolService");

const authControl = async (email, userName, password, authType) => {
  let fieldsControl = true; //assumes that the user filled all the fields

  const query = `select user_id, user_name, user_email, user_password from users where 
  user_name = $1 or user_email = $2`;

  const isSignupType = authType == "signup" ? true : false; //verify if is login or signup type

  //verify is all required fields are completed
  if (isSignupType) {
    isAllFieldsCompleted = email && userName && password ? true : false;
  } else {
    isAllFieldsCompleted = email && password ? true : false;
  }

  if (!isAllFieldsCompleted) {
    // switch fieldControl if necesary
    fieldsControl = false;
  } else {
    try {
      const data = await pool.query(query, [userName, email]); // verfiy is the user or email exists

      if (data.rowCount > 0) {
        const userData = data.rows[0];
        if (userData.user_name == userName || userData.user_email == email) {
          const queryResult = isSignupType
            ? "user already exists" // return a warning if is signup type
            : userData; // return the data to proceed with the login

          return queryResult;
        }
      }
    } catch (error) {
      console.log(error);
    }
  }
  return fieldsControl; //returning only if fieldsControl is switched to false
};

module.exports = authControl;
