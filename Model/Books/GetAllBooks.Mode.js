const { sql } = require("../connection.model");

const GetAllBooks = async () => {
  try {
    let result = await sql.query(`SELECT * FROM Books`);
    return result.recordset;
  } catch (error) {
    console.log(" Ocurrio un error en GetAllBooks.Model: ", error);
  }
};

const GetAllBooksByName = async (title) => {
  try {
    let result = await sql.query(
      `SELECT * FROM Books WHERE Title = '${title}'`
    );
    return result.recordset;
  } catch (error) {
    console.log(" Ocurrio un error en GetAllBooks.Model: ", error);
  }
};

const GetlAllBookWithFilters = async (type, whichType) => {
  let min;
  let max;

  if (whichType) {
    try {
      let result = await sql.query(
        `SELECT * FROM Books WHERE Title LIKE '%${type}%' OR Autor LIKE '%${type}%' `
      );

      if (result.recordset.length > 0) {
        return {
          result: result.recordset,
          errorMessage: "",
        };
      } else {
        return {
          result: result.recordset,
          errorMessage: "Libro no encontrado",
        };
      }
    } catch (error) {
      console.log("Ocurrio un error en GetAllBooks.Model", error);
    }
  } else {
    switch (type) {
      case "1":
        min = 0;
        max = 5;
        break;
      case "2":
        min = 5;
        max = 15;
        break;
      case "3":
        min = 15;
        max = 30;
        break;
      case "4":
        min = 30;
        max = 50;
        break;
      case "5":
        min = 50;
        max = 100000;
        break;

      default:
        break;
    }

    try {
      let result = await sql.query(
        `SELECT * FROM Books WHERE Stock BETWEEN ${min} AND ${max}`
      );

      if (result.recordset.length > 0) {
        return {
          result: result.recordset,
          errorMessage: "",
        };
      } else {
        return {
          result: result.recordset,
          errorMessage: "No tenemos stock con esas cantidades disponibles",
        };
      }
    } catch (error) {
      console.log("Ocurrio un error en GetAllBooks.Model", error);
    }
  }
};

module.exports = { GetAllBooks, GetlAllBookWithFilters, GetAllBooksByName };
