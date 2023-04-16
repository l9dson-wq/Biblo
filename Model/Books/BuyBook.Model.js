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
      `INSERT INTO Shopping (bookId, userId, totalBooks, totaAmount, soldDate, originalPrice) 
      VALUES (${bookId}, ${userId}, ${quantity}, ${totaAmount}, '${fechaHoy}', ${originalPrice})`
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

const buyShoppinCar = async (
  userId,
  shoppingCarList,
  fechaHoy
) => {
  try {

    //PRIMERO TENGO QUE GUARDAR CADA UNA DE LAS COMPRAS
    for (let i = 0; i < shoppingCarList.length; i++) {
      await sql.query(
        `INSERT INTO Shopping (bookId, userId, totalBooks, totaAmount, soldDate, originalPrice) 
        VALUES 
        (${shoppingCarList[i].bookId}, ${shoppingCarList[i].userId}, ${shoppingCarList[i].bookAmount}, ${shoppingCarList[i].totalPrice}, '${fechaHoy}', ${shoppingCarList[i].bookPrice})`
      );
    }

    //TENGO QUE RESTARTE EL STOCK A CADA UNO DE LOS LIBROS
    for( let i = 0; i < shoppingCarList.length; i++){
      await sql.query(
        `UPDATE Books SET Stock = Stock - ${shoppingCarList[i].bookAmount} WHERE bookID = ${shoppingCarList[i].bookId}`
      );
    }

    //AHORA TENGO QUE ELIMINAR TODO DE LA LISTA DE COMPRAS DE LA CESTA
    for( let i = 0; i < shoppingCarList.length; i++){
      await sql.query(
        `DELETE FROM ShoppingCar WHERE userId = ${userId} AND shoppingCardId = ${shoppingCarList[i].shoppingCardId} `
      );
    }

    return true;

  } catch (error) {
    console.log("Error en buyShoppinCar.Model: ", error);
  }
};

module.exports = { buyBooks, buyShoppinCar };
