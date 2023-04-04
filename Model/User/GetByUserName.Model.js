const { connect, sql } = require("../connection.model");

async function getUserName(userName) {
  try {
    let result = await sql.query(`SELECT * FROM Users WHERE UserName = '${userName}' `);

    if ( result.recordset.length === 0 ) {
      console.log("EL USUARIO NO EXISTE");
    } else {
      console.log("EL USUARIO EXISTE");
      return result;
    }
  } catch (error) {
    return `Ocurrio un error ${error}`;
  }
}

module.exports = { getUserName };