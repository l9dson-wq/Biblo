const { sql } = require("../connection.model");

const buyBooks = async (bookId, userId, quantity) => {
  try {
    // Introduzco los datos de la compra a la base de datos
    await sql.query(
      `INSERT INTO Shopping (bookId, userId, total) VALUES (${bookId}, ${userId}, ${quantity})`
    );

    // Luego tengo que restarle el stock que compro el cliente a el libro que compro
    await sql.query(
      `UPDATE Books SET Stock = Stock - ${quantity} WHERE bookID = ${bookId}`
    );

    return true;
  } catch (error) {
    console.log("Error en BuyBook.Model: ", error);
  }
};

module.exports = { buyBooks };