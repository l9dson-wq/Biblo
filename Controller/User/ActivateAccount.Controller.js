const { connect, sql } = require("../../Model/connection.model");
const { getEmailInformation } = require("../sendEmail.Controller");

async function activateUserStatus(token) {
  try {
    let userGot = await sql.query(
      `SELECT * FROM Users WHERE UserToken = '${token}' `
    );
    let user = userGot.recordset;

    if (user.length !== 0) {
      if (user[0].EmailConfirmed === "false") {
        await sql.query(
          `UPDATE Users SET EmailConfirmed = 'true' WHERE UserToken = '${token}'`
        );

        //console.log("Usuario activado, puede iniciar sesion");
        return 'Correo electronico autenticado de manera exitosa!';
      }

      return 'Usuario previamente autenticado, link no valido para esta accion';
    }

    return 'Usuario no encontrado o link no valido para esta accion';
  } catch (error) {
    console.log(error);
  }
}

module.exports = { activateUserStatus };