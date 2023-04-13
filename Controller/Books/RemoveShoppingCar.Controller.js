const express = require("express");
const router = express.Router();
const session = require("express-session");
const shoppingCarModel = require("../../Model/Books/ShoppingCar.Model");

const removeShoppingCar = async (req, res) => {
    let userId = req.session.userId;
    let carId = req.body.removeCardId;
    let totalBooks = req.body.removeTotalBooks;

    let result = await shoppingCarModel.removeShoppingCar( carId, userId, totalBooks);

    if(result){
        return res.redirect("Cesta");
    }else{
        return res.redirect("Cesta");
    }
};

const deleteFromShoppingCar = async (req, res) => {
    let userId = req.session.userId;
    let carId = req.body.removeCardId;
    let totalBooks = req.body.removeTotalBooks;
    let removeBookId = req.body.removeBookId;

    let result = await shoppingCarModel.deleteFromShoppingCar(carId, userId, totalBooks, removeBookId);

    if(result){
        return res.redirect("Cesta");
    }else{
        return res.redirect("Cesta");
    }
};

module.exports = { removeShoppingCar, deleteFromShoppingCar,  };