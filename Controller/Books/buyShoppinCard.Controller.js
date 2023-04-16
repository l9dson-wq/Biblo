const express = require("express");
const router = express.Router();
const session = require("express-session");
const buyBookModel = require("../../Model/Books/BuyBook.Model");
const getAllShoppingCarModel = require("../../Model/Books/ShoppingCar.Model");

const buyShoppingCar = async (req, res) => {
    let userId = req.session.userId;

    let totalShoppingCar = await getAllShoppingCarModel.getAllShoppingCar(userId);

    //Obtener la fecha en cierto formato
    let fecha = new Date();
    let dia = fecha.getDate().toString().padStart(2, '0');
    let mes = (fecha.getMonth() + 1).toString().padStart(2, '0');
    let anio = fecha.getFullYear().toString();

    let fechaHoy = dia + '/' + mes + '/' + anio;
    //Obtener la fecha en cierto formato

    let result = await buyBookModel.buyShoppinCar( userId, totalShoppingCar.result, fechaHoy);

    if(result){
        return res.redirect('/Cesta?successShop=true&runFunction=true');
    }else{
        return res.redirect('Cesta');
    }
};

module.exports = { buyShoppingCar, };