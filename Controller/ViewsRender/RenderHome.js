const express = require("express");
const router = express.Router();
const session = require("express-session");
const getAllShoppingCarModel = require("../../Model/Books/ShoppingCar.Model");

const RenderHome = async (req, res) => {
    let userID = req.session.userId;

    let totalShoppingCar = await getAllShoppingCarModel.getAllShoppingCar(userID);
    let totalShoppingCarNumber = Number(totalShoppingCar.result.length);
    // console.log(totalShoppingCarNumber);

    let totalPrice = 0;
    let totalBooks = 0;
  
    //SUMO EL PRECIO TOTAL DE TODOS LOS LIBROS Y EL TOTAL DE LAS UNIDADES
    for (let i = 0; i < totalShoppingCar.result.length; i++) {
      totalPrice += totalShoppingCar.result[i].totalPrice;
      totalBooks += Number(totalShoppingCar.result[i].bookAmount);
    }
    //REDONDEO EL NUMERO A SOLO DOS DECIMALES DESPUES DEL PUNTO
    totalPrice = parseFloat(totalPrice.toFixed(2));

    res.render('Home', 
    { 
      session: req.session, 
      totalNoti: totalBooks,
      message: "",
      nameSearched: undefined,  
    });
};

module.exports = { RenderHome, };