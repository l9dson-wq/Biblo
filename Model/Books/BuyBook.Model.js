const { sql } = require("../connection.model");

const buyBooks = async (
  bookId,
  userId,
  quantity,
  totaAmount,
  fechaHoy,
  originalPrice
) => {
  try {
    // Introduzco los datos de la compra a la base de datos
    await sql.query(
      `INSERT INTO Shopping (bookId, userId, totalBooks, totaAmount, soldDate, originalPrice) VALUES (${bookId}, ${userId}, ${quantity}, ${totaAmount}, '${fechaHoy}', ${originalPrice})`
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
