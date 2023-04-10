const express = require("express");
const router = express.Router();
const session = require("express-session");
const getAllShoppingCarModel = require("../../Model/Books/ShoppingCar.Model");

const RenderCesta = async (req, res) => {
    let userID = req.session.userId;

    let totalShoppingCar = await getAllShoppingCarModel.getAllShoppingCar(userID);
    let totalShoppingCarNumber = Number(totalShoppingCar.length);
    console.log(totalShoppingCarNumber);  

    res.render("Cesta", { session: req.session, totalNoti: totalShoppingCarNumber, });
};

module.exports = { RenderCesta, };