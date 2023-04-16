const express = require("express");
const router = express.Router();
const session = require("express-session");
const getFavoritesModel = require("../../Model/Favorites/FavoritesBooks.Modal");
const getAllShoppingCarModel = require("../../Model/Books/ShoppingCar.Model");

const RenderFavorites = async (req, res) => {
  let userId = req.session.userId;

  let result = await getFavoritesModel.getFavorites(userId);

  //#####################CARRITO O CESTA DE COMPRAS########################
  let totalShoppingCar = await getAllShoppingCarModel.getAllShoppingCar(userId);
  let totalShoppingCarNumber = Number(totalShoppingCar.result.length);
  console.log(totalShoppingCarNumber);

  let totalPrice = 0;
  let totalBooks = 0;

  //SUMO EL PRECIO TOTAL DE TODOS LOS LIBROS Y EL TOTAL DE LAS UNIDADES
  for (let i = 0; i < totalShoppingCar.result.length; i++) {
    totalPrice += totalShoppingCar.result[i].totalPrice;
    totalBooks += Number(totalShoppingCar.result[i].bookAmount);
  }
  //REDONDEO EL NUMERO A SOLO DOS DECIMALES DESPUES DEL PUNTO
  totalPrice = parseFloat(totalPrice.toFixed(2));
  //#####################CARRITO O CESTA DE COMPRAS########################

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
