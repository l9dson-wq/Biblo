const { sql } = require("../connection.model");

async function validateUserData(userName, password) {
  console.log(userName, "-", password);
  try {
    let result = await sql.query(
      `SELECT * FROM Users WHERE userName = '${userName}' AND Password='${password}'`
    );
    
    return result;
  } catch (error) {
    console.log(`Ocurrio un erro e validateUserData: ${error}`);
  }
}

module.exports = { validateUserData };
