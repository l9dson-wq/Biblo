const express = require("express");
const router = express.Router();
const session = require("express-session");
const getAllShoppingCarModel = require("../../Model/Books/ShoppingCar.Model");

const RenderCesta = async (req, res) => {
  let userID = req.session.userId;

  let totalShoppingCar = await getAllShoppingCarModel.getAllShoppingCar(userID);
  let totalShoppingCarNumber;
  console.log(totalShoppingCar);

  let totalPrice = 0;
  let totalBooks = 0;

  //SUMO EL PRECIO TOTAL DE TODOS LOS LIBROS Y EL TOTAL DE LAS UNIDADES
  for (let i = 0; i < totalShoppingCar.length; i++) {
    totalPrice += totalShoppingCar[i].totalPrice;
    totalBooks += Number(totalShoppingCar[i].bookAmount);
  }
  //REDONDEO EL NUMERO A SOLO DOS DECIMALES DESPUES DEL PUNTO
  totalPrice = parseFloat(totalPrice.toFixed(2));

  console.log(totalPrice);

  res.render("Cesta", {
    session: req.session,
    totalNoti: totalBooks,
    allShoppingCar: totalShoppingCar,
    subtotal: totalPrice,
    totalBooks: totalBooks,
  });
};

module.exports = { RenderCesta };
