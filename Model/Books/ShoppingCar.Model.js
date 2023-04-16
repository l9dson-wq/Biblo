const { sql } = require("../connection.model");

const shoppingCar = async (
  userId,
  bookId,
  bookTitle,
  bookImagePath,
  bookPrice
) => {
  try {
    let result = await sql.query(
      `SELECT * FROM ShoppingCar WHERE bookId = ${bookId} AND userId = ${userId}`
    );

    let bookResult = await sql.query(
      `SELECT * FROM Books WHERE bookId = ${bookId}`
    );

    console.log(result.recordset);

    if( result.recordset.length !== 0 ){
      if ( result.recordset[0].bookAmount === bookResult.recordset[0].Stock ) {
        console.log("Este libro ya alcanzo el maximo disponible");
        return false;
      }
    }

    if (result.recordset.length !== 0) {
      await sql.query(
        `UPDATE ShoppingCar SET bookAmount = bookAmount + 1, totalPrice = totalPrice + ${bookPrice} WHERE shoppingCardId = ${result.recordset[0].shoppingCardId} `
      );
    } else {
      await sql.query(
        `INSERT INTO 
                ShoppingCar (bookId, userId, bookTitle, bookImagePath, bookPrice, bookAmount, totalPrice) 
                VALUES 
                (${bookId},${userId},'${bookTitle}','${bookImagePath}',${bookPrice}, 1, ${bookPrice})`
      );
    }

    return true;
  } catch (error) {
    console.log("Ocurrio un error en ShoppingCarMOdel", error);
  }
};

const getAllShoppingCar = async (userId) => {
  try {
    let result = await sql.query(
      `SELECT * FROM ShoppingCar WHERE userId = ${userId}`
    );

    let booksIDs = [];
    for( let i = 0; i < result.recordset.length; i++ ){
      booksIDs.push(result.recordset[i].bookId);
    }

    let books = [];
    for( let i = 0; i < booksIDs.length; i++){
      books.push((await sql.query(`SELECT * FROM Books WHERE bookID = ${booksIDs[i]}`)).recordset);
    }

    return({
      result: result.recordset,
      books: books,
    });
  } catch (erro) {
    console.log("Ocurrio un error obteniendo los carritos de compra: ", erro);
  }
};

const removeShoppingCar = async (carId, userId, totalBooks) => {
    try{
        let result = await sql.query(
            `SELECT * FROM ShoppingCar WHERE shoppingCardId = ${carId} AND userId = ${userId}`
        );

        if(result.recordset[0].bookAmount > 1){
            await sql.query(
                `UPDATE ShoppingCar SET bookAmount = bookAmount - 1, totalPrice = totalPrice - bookPrice WHERE shoppingCardId = ${carId}`
            );
        }else{
            await sql.query(
                `DELETE FROM ShoppingCar WHERE shoppingCardId = ${carId} AND userId = ${userId}`
            );
        }

        return true;
    }catch(error){
        console.log("Ocurrio un error borrando del carrito de compras: ", error);
    }
};

const deleteFromShoppingCar = async (carId, userId, totalBooks, removeBookId) => {
  try{
    await sql.query(
      `DELETE FROM ShoppingCar WHERE bookId = ${removeBookId} AND userId = ${userId}`
    );
    return true;
  }catch(error){
    console.log("Ocurrio un error Eliminando del carrito de compras: ", error);
  }
};

module.exports = { shoppingCar, getAllShoppingCar, removeShoppingCar, deleteFromShoppingCar };
