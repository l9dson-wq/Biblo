const express = require("express");
const router = express.Router();
const session = require("express-session");
const getFavoritesModel = require("../../Model/Favorites/FavoritesBooks.Modal");

const RenderFavorites = async (req, res) => {
  let userId = req.session.userId;

  let result = await getFavoritesModel.getFavorites(userId);

  // result.imageLocations.forEach((item) => {
  //   console.log(item);
  // });

  res.render("Favorites", {
    session: req.session,
    booksName: result.booksName,
    imageLocations: result.imageLocations,
  });
};

module.exports = { RenderFavorites };
