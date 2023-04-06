const { sql } = require("../connection.model");
const bcrypt = require("bcrypt");

async function validateUserData(userName, password) {
  //console.log(userName, "-", password);
  try {
    let result = await sql.query(
      `SELECT * FROM Users WHERE UserName = '${userName}'`
    );

    let user;
    
    if (result.recordset.length !== 0) {
      user = result.recordset[0];
    } else {
      return {
        userFound: false,
        isValidPassword: false,
      };
    }

    // console.log(user);

    if (!user) {
      console.log("Esto es si el usuario no existe", user);
      // Si el usuario no existe, regresa un objeto con una lista vacia
      return [{}];
    }

    const passwordMatch = await bcrypt.compare(password, user.Password);

    if (passwordMatch) {
      console.log("Esto es si la contra es igual", user);
      return {
        userFound: true,
        isValidPassword: true,
        result: result.recordset[0],
      };
    } else {
      console.log("Esto es si la contra no es igual", user);
      return {
        userFound: true,
        isValidPassword: false,
        result: result.recordset[0],
      };
    }
  } catch (error) {
    console.log(`Ocurrio un error en validateUserData: ${error}`);
    return [{}];
  }
}

module.exports = { validateUserData };
