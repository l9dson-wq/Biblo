const express = require("express");
const router = express.Router();
const session = require("express-session");
const getAllShoppingCarModel = require("../../Model/Books/ShoppingCar.Model");

const RenderCesta = async (req, res) => {
  let userID = req.session.userId;

  let totalShoppingCar = await getAllShoppingCarModel.getAllShoppingCar(userID);
  let totalShoppingCarNumber = Number(totalShoppingCar.length);
  console.log(totalShoppingCar);

  let totalPrice = 0;
  let numeroLimitado;

  for( let i = 0; i < totalShoppingCar.length; i++ ){
    totalPrice += totalShoppingCar[i].totalPrice;
  }

 totalPrice = parseFloat(totalPrice.toFixed(2));

  console.log(totalPrice);

  res.render("Cesta", {
    session: req.session,
    totalNoti: totalShoppingCarNumber,
    allShoppingCar: totalShoppingCar,
    subtotal: totalPrice,
  });
};

module.exports = { RenderCesta };