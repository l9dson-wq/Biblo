const { sql } = require("../connection.model");

const getBookAllInformation = async (bookID) => {
  try {
    let result = await sql.query(
      `SELECT * FROM Books WHERE bookID = ${bookID}`
    );
    return result.recordset;
  } catch (error) {
    console.log("Ocurrio un error en EditBook: ", error);
  }
};

const editBookInformation = async (
  rutaArchivo,
  title,
  author,
  description,
  year,
  price,
  stock,
  userId,
  bookId
) => {
  try {
    await sql.query(
      `UPDATE Books SET ImagePath = '${rutaArchivo}', Title='${title}', Autor='${author}', Description='${description}', PublishedYear=${year}, Price=${price}, Stock=${stock}, BookedById=${userId} WHERE bookID = ${bookId}`
    );
    return `EL libro ${title} fue editado con exito!`;
  } catch (error) {
    console.log("Ocurrio un error en EditBook.Model: ", error);
  }
};

module.exports = { editBookInformation, getBookAllInformation };
