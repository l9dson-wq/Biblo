const express = require("express");
const router = express.Router();
const session = require("express-session");
const GetBookInformationModel = require("../../Model/Books/GetBookInformation");
const FavoriteExistedModel = require("../../Model/Favorites/FavoritesBooks.Modal");
const commentsModel = require("../../Model/comments/comments.Model");
// const likesCommentsModel = require("../../Model/comments/likesComments.Model");

const RenderBooksInformation = async (req, res) => {
  let bookID = req.query.bookID;
  let userID = req.session.userId;

  let result = await GetBookInformationModel.getBookInformation(bookID);

  let resultFavorite = await FavoriteExistedModel.FavoriteExisted(
    bookID,
    userID
  );

  let bookComments = await commentsModel.GetComments(userID, bookID);

  res.render("BooksInformation", {
    session: req.session,
    result: result,
    favoriteChecked: resultFavorite,
    comments: bookComments,
  });
};

module.exports = { RenderBooksInformation };
