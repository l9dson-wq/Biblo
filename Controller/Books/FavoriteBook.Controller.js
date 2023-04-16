const express = require("express");
const router = express.Router();
const session = require("express-session");
const addFavoriteModel = require("../../Model/Favorites/FavoritesBooks.Modal");

const FavoriteBook = async (req, res) => {
    let bookId = req.body.bookId;
    let userId = req.session.userId;

    bookId = Number(bookId);

    let result = await addFavoriteModel.addFavorite(bookId, userId);
    //console.log(result);

    if(result){
        return res.redirect(`BooksInformation?bookID=${bookId}`);
    }else{
        return res.redirect(`BooksInformation?bookID=${bookId}`);
    }
}

module.exports = { FavoriteBook, };