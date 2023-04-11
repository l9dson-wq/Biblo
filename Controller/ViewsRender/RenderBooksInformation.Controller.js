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
  let totalShoppingCarNumber = Number(totalShoppingCar.length);
  console.log(totalShoppingCarNumber);

  let totalPrice = 0;
  let totalBooks = 0;

  //SUMO EL PRECIO TOTAL DE TODOS LOS LIBROS Y EL TOTAL DE LAS UNIDADES
  for (let i = 0; i < totalShoppingCar.length; i++) {
    totalPrice += totalShoppingCar[i].totalPrice;
    totalBooks += Number(totalShoppingCar[i].bookAmount);
  }
  //REDONDEO EL NUMERO A SOLO DOS DECIMALES DESPUES DEL PUNTO
  totalPrice = parseFloat(totalPrice.toFixed(2));

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
