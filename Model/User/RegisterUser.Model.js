const { sql } = require("../connection.model");
const {
  getEmailInformation,
} = require("../../Controller/sendEmail.Controller");
const { sendToken } = require("../../Controller/generateToken.Controller");
const { setTokenReceived } = require("../../Controller/sendEmail.Controller");

async function insertUser(
  nombre,
  apellido,
  correo,
  usuario,
  password,
  userRole
) {
  try {
    let tokenForUser = sendToken();

    let userNameGot = await sql.query(
      `SELECT * FROM Users WHERE UserName = '${usuario}' `
    );

    if (userNameGot.recordset.length !== 0) {
      return `El nombre de usuario ${usuario} ya ha sido registro, intente con uno diferente`;
    }

    await sql.query(
      `INSERT INTO Users (Name, LastName, Email, UserName, Password, UserRole, EmailConfirmed, UserToken) Values ('${nombre}', '${apellido}','${correo}','${usuario}', '${password}', '${userRole}', 'false', '${tokenForUser}')`
    );

    setTokenReceived(tokenForUser);

    getEmailInformation(correo, nombre);

    return `Datos sobre ${nombre} han sido insertados correctamente`;
  } catch (error) {
    return `Ocurrio un error insertando los datos ${error}`;
  }
}

module.exports = { insertUser };
