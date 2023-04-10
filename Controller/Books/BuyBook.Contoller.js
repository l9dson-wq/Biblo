const express = require("express");
const router = express.Router();
const session = require("express-session");
const myBooksModel = require("../../Model/Books/BuyBook.Model");

const BuyBook = async (req, res) => {
    let cantidad = req.body.cantidad;
    let bookId = req.body.bookId;
    let userId = req.session.userId;
    let bookPrice = req.body.totalAmount;

    //total de la venta
    let totalAmount = bookPrice * cantidad;

    //Obtener la fecha en cierto formato
    let fecha = new Date();
    let dia = fecha.getDate().toString().padStart(2, '0');
    let mes = (fecha.getMonth() + 1).toString().padStart(2, '0');
    let anio = fecha.getFullYear().toString();

    let fechaHoy = dia + '/' + mes + '/' + anio;
    //Obtener la fecha en cierto formato

    let result = await myBooksModel.buyBooks( bookId, userId, cantidad, totalAmount, fechaHoy, bookPrice);

    if(result){
        res.redirect(`/BooksInformation?bookID=${bookId}&successShop=true&runFunction=true`);
    }else{
        return res.redirect("BooksIndex");
    }
};

module.exports = { BuyBook, };