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

  res.render("Favorites", {
    session: req.session,
    booksName: result.booksName,
    imageLocations: result.imageLocations,
    totalNoti: totalShoppingCarNumber,
  });
};

module.exports = { RenderFavorites };
