const express = require("express");
const router = express.Router();
const session = require("express-session");
const myBooksModel = require("../../Model/Books/BuyBook.Model");

const BuyBook = async (req, res) => {

    let cantidad = req.body.cantidad;
    let bookId = req.body.bookId;
    let userId = req.session.userId;

    let result = await myBooksModel.buyBooks( bookId, userId, cantidad);

    if(result){
        res.redirect(`/BooksInformation?bookID=${bookId}&successShop=true&runFunction=true`);
    }else{
        return res.redirect("BooksIndex");
    }
};

module.exports = { BuyBook, };