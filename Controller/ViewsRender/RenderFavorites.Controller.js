const express = require("express");
const router = express.Router();
const session = require("express-session");
const getFavoritesModel = require("../../Model/Favorites/FavoritesBooks.Modal");
const getAllShoppingCarModel = require("../../Model/Books/ShoppingCar.Model");

const RenderFavorites = async (req, res) => {
  let userId = req.session.userId;

  let result = await getFavoritesModel.getFavorites(userId);

  // result.imageLocations.forEach((item) => {
  //   console.log(item);
  // });

  let totalShoppingCar = await getAllShoppingCarModel.getAllShoppingCar(userId);
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

  res.render("Favorites", {
    session: req.session,
    booksName: result.booksName,
    imageLocations: result.imageLocations,
    totalNoti: totalBooks,
    message: "",
    nameSearched: undefined,
  });
};

module.exports = { RenderFavorites };
