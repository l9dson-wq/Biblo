const express = require("express");
const router = express.Router();
const session = require("express-session");
const shoppingCarModel = require("../../Model/Books/ShoppingCar.Model");

const shoppingCar = async (req, res) => {
    let bookId;
    let bookTitle;
    let bookImagePath;
    let bookPrice;
    let userId;
    let bookAmount;
    let totalPrice;

    bookId = req.body.bookIdCar;
    bookTitle = req.body.bookTitleCar;
    bookImagePath = req.body.imagePathCar;
    bookPrice = req.body.bookPriceCar;
    userId = req.session.userId;

    console.log(bookId, bookTitle, bookImagePath, bookPrice);

    let result = await shoppingCarModel.shoppingCar(userId, bookId, bookTitle, bookImagePath, bookPrice);

    if(result){
        return res.redirect(`BooksInformation?bookID=${bookId}`);
    }else{
        return res.redirect(`BooksInformation?bookID=${bookId}`);
    }
};

module.exports = { shoppingCar, }; 