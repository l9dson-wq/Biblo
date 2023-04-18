const express = require("express");
const router = express.Router();
const session = require("express-session");
const getAllShoppingCarModel = require("../../Model/Books/ShoppingCar.Model");
const buyShoppinCarController = require("../Books/buyShoppinCard.Controller");

const RenderCesta = async (req, res) => {
  let userID = req.session.userId;

  let totalShoppingCar = await getAllShoppingCarModel.getAllShoppingCar(userID);
  //console.log( totalShoppingCar.result );
  // console.log(totalShoppingCar);
  for( let i = 0; i < totalShoppingCar.result.length; i++){
    for( let j = 0; j < totalShoppingCar.books.length; j++){
      if( totalShoppingCar.result[i].bookId === totalShoppingCar.books[j][0].bookID){
        //console.log("Si entra en el for");
        totalShoppingCar.result[i].Stock = totalShoppingCar.books[j][0].Stock;
      }
    }
  }

  //Descuento
  //SACANDO EL PORCENTAJE
  // if (totalShoppingCar.books.length > 0) {
  //   for (let i = 0; i < totalShoppingCar.books.length; i++) {
  //     if (totalShoppingCar.books[i][0].Stock <= 5 && totalShoppingCar.books[i][0].Stock > 0) {
  //       totalShoppingCar.books[i][0].Discount = parseFloat((85 * parseFloat(books[i][0].Price)) / 100).toFixed(2);
  //     }
  //   }
  // } else if (totalShoppingCar.books.length === 1 && totalShoppingCar.books[0].length > 0) {
  //   if (totalShoppingCar.books[0][0].Stock <= 5 && totalShoppingCar.books[0][0].Stock > 0) {
  //     totalShoppingCar.books[0][0].Discount = parseFloat((85 * parseFloat(books[0][0].Price)) / 100).toFixed(2);
  //   }
  // }
  

  // for( let i = 0; i < totalShoppingCar.books.length; i++){
  //   console.log(totalShoppingCar.books[i][0]);
  // }
  console.log(totalShoppingCar.books[0][0]);

  let totalPrice = 0;
  let totalBooks = 0;

  //SUMO EL PRECIO TOTAL DE TODOS LOS LIBROS Y EL TOTAL DE LAS UNIDADES
  for (let i = 0; i < totalShoppingCar.result.length; i++) {
    totalPrice += totalShoppingCar.result[i].totalPrice;
    totalBooks += Number(totalShoppingCar.result[i].bookAmount);
  }
  //REDONDEO EL NUMERO A SOLO DOS DECIMALES DESPUES DEL PUNTO
  totalPrice = parseFloat(totalPrice.toFixed(2));

  //GUARDAR TODOS LOS IDs DE LOS LIBROS EN UN ARRAY PARA USARLOS EN LA COMPRA
  let booksIds = [];
  let shoppingCarIds = [];
  for( let i = 0; i < totalShoppingCar.result.length; i++){
    booksIds.push(totalShoppingCar.result[i].bookId);
    shoppingCarIds.push(totalShoppingCar.result[i].shoppingCardId);
  }

  res.render("Cesta", {
    session: req.session,
    totalNoti: totalBooks,
    allShoppingCar: totalShoppingCar.result,
    subtotal: totalPrice,
    totalBooks: totalBooks,
    message: "",
    nameSearched: undefined,
    booksId: booksIds,
  });
};

module.exports = { RenderCesta };
