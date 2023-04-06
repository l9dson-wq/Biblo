const { sql } = require("../connection.model");

const GetAllBooks = async () => {
  try {
    let result = await sql.query(`SELECT * FROM Books`);
    return result.recordset; 
  } catch (error) {
    console.log(" Ocurrio un error en UploadBook.Model: ", error);
  }
};

module.exports = { GetAllBooks, };