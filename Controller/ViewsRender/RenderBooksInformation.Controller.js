const express = require("express");
const router = express.Router();
const session = require("express-session");
const GetBookInformationModel = require("../../Model/Books/GetBookInformation");
const FavoriteExistedModel = require("../../Model/Favorites/FavoritesBooks.Modal");
const commentsModel = require("../../Model/comments/comments.Model");
const getAllShoppingCarModel = require("../../Model/Books/ShoppingCar.Model");

const RenderBooksInformation = async (req, res) => {
  let bookID = req.query.bookID;
  let userID = req.session.userId;

  let result = await GetBookInformationModel.getBookInformation(bookID);

  let resultFavorite = await FavoriteExistedModel.FavoriteExisted(
    bookID,
    userID
  );

  let bookComments = await commentsModel.GetComments(userID, bookID);

  let totalShoppingCar = await getAllShoppingCarModel.getAllShoppingCar(userID);

  //SACANDO EL PORCENTAJE
  if( result[0].Stock <= 5 && result[0].Stock >= 1){
    result[0].Discount = parseFloat((14 * parseFloat(result[0].Price)) / 100).toFixed(2);
  }

  //PONER DESCUENTO AL PRECIO
  let totalPrice = 0;
  let totalBooks = 0;

  //SUMO EL PRECIO TOTAL DE TODOS LOS LIBROS Y EL TOTAL DE LAS UNIDADES
  for (let i = 0; i < totalShoppingCar.length; i++) {
    totalPrice += totalShoppingCar[i].totalPrice;
    totalBooks += Number(totalShoppingCar[i].bookAmount);
  }
  //REDONDEO EL NUMERO A SOLO DOS DECIMALES DESPUES DEL PUNTO
  totalPrice = parseFloat(totalPrice.toFixed(2));

  console.log(result);

  res.render("BooksInformation", {
    session: req.session,
    result: result,
    favoriteChecked: resultFavorite,
    comments: bookComments,
    totalNoti: totalBooks,
    message: "",
    nameSearched: undefined,
  });
};

module.exports = { RenderBooksInformation };
