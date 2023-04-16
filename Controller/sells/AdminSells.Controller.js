const express = require("express");
const router = express.Router();
const session = require("express-session");
const getAllSellModel = require("../../Model/Sells/GetAllSells.Model");
const getAllShoppingCarModel = require("../../Model/Books/ShoppingCar.Model");

const getAllSells = async (req, res) => {
  let userId = req.session.userId;

  //Obtener la fecha en cierto formato
  let fecha = new Date();
  let dia = fecha.getDate().toString().padStart(2, "0");
  let mes = (fecha.getMonth() + 1).toString().padStart(2, "0");
  let anio = fecha.getFullYear().toString();

  let fechaHoy = dia + "/" + mes + "/" + anio;
  //Obtener la fecha en cierto formato

  let allSells = await getAllSellModel.GetAllSells(fechaHoy);
  let allShopping = allSells.shopping;
  let allUsers = allSells.users;
  let allBooks = allSells.books;

  let newList = [];

  for (let i = 0; i < allShopping.length; i++) {
    for (let j = 0; j < allBooks.length; j++) {
      for (let x = 0; x < allUsers.length; x++) {
        if (
          allShopping[i].bookId === allBooks[j].bookID &&
          allShopping[i].userId === allUsers[x].userID
        ) {
          newList.push({
            userId: allShopping[i].userId,
            bookTitle: allBooks[j].Title,
            totalBooks: allShopping[i].totalBooks,
            totalPrice: allShopping[i].totaAmount,
            originalPrice: allShopping[i].originalPrice,
            sellDate: allShopping[i].soldDate,
            userFirstName: allUsers[x].Name,
            imagePath: allBooks[j].ImagePath,
            bookId: allBooks[j].bookID,
          });
        }
      }
    }
  }

  let dates = new Set();
  for( let i = 0; i < newList.length; i++ ){
    dates.add(newList[i].sellDate);
  }
  console.log( "Fechas: ", dates );

  let totalShoppingCar = await getAllShoppingCarModel.getAllShoppingCar(userId);

  let totalPrice = 0;
  let totalBooks = 0;
  //SUMO EL PRECIO TOTAL DE TODOS LOS LIBROS Y EL TOTAL DE LAS UNIDADES
  for (let i = 0; i < totalShoppingCar.length; i++) {
    totalPrice += totalShoppingCar[i].totalPrice;
    totalBooks += Number(totalShoppingCar[i].bookAmount);
  }
  //REDONDEO EL NUMERO A SOLO DOS DECIMALES DESPUES DEL PUNTO
  totalPrice = parseFloat(totalPrice.toFixed(2));

  console.log("Mi nueva lista", newList);

  res.render("AdminSells", {
    result: newList,
    session: req.session,
    message: "",
    nameSearched: undefined,
    totalNoti: totalBooks,
    dates: dates,
  });
};

const getAllUsersSells = async (req, res) => {
  let userId = req.session.userId;

  //Obtener la fecha en cierto formato
  let fecha = new Date();
  let dia = fecha.getDate().toString().padStart(2, "0");
  let mes = (fecha.getMonth() + 1).toString().padStart(2, "0");
  let anio = fecha.getFullYear().toString();

  let fechaHoy = dia + "/" + mes + "/" + anio;
  //Obtener la fecha en cierto formato

  let allSells = await getAllSellModel.GetAllUsersSells(fechaHoy, userId);
  let allShopping = allSells.shopping;
  let allUsers = allSells.users;
  let allBooks = allSells.books;

  let newList = [];

  for (let i = 0; i < allShopping.length; i++) {
    for (let j = 0; j < allBooks.length; j++) {
      for (let x = 0; x < allUsers.length; x++) {
        if (allShopping[i].bookId === allBooks[j].bookID) {
          newList.push({
            userId: allShopping[i].userId,
            bookTitle: allBooks[j].Title,
            totalBooks: allShopping[i].totalBooks,
            totalPrice: allShopping[i].totaAmount,
            originalPrice: allShopping[i].originalPrice,
            sellDate: allShopping[i].soldDate,
            userFirstName: allUsers[x].Name,
            imagePath: allBooks[j].ImagePath,
            bookId: allBooks[j].bookID,
          });
        }
      }
    }
  }

  let totalShoppingCar = await getAllShoppingCarModel.getAllShoppingCar(userId);

  let totalPrice = 0;
  let totalBooks = 0;
  //SUMO EL PRECIO TOTAL DE TODOS LOS LIBROS Y EL TOTAL DE LAS UNIDADES
  for (let i = 0; i < totalShoppingCar.result.length; i++) {
    totalPrice += totalShoppingCar.result[i].totalPrice;
    totalBooks += Number(totalShoppingCar.result[i].bookAmount);
  }
  //REDONDEO EL NUMERO A SOLO DOS DECIMALES DESPUES DEL PUNTO
  totalPrice = parseFloat(totalPrice.toFixed(2));

  // console.log("Mi nueva lista", newList);

  res.render("UserSells", {
    result: newList,
    session: req.session,
    message: "",
    nameSearched: undefined,
    totalNoti: totalBooks,
  });
};

const getAllSellsByDate = async (req, res) => {
  let userId = req.session.userId;
  let requiredDate = req.body.requiredDate;

  let allSells = await getAllSellModel.getSpecificSells(requiredDate);
  let allShopping = allSells.shopping;
  let allUsers = allSells.users;
  let allBooks = allSells.books;

  let newList = [];

  for (let i = 0; i < allShopping.length; i++) {
    for (let j = 0; j < allBooks.length; j++) {
      for (let x = 0; x < allUsers.length; x++) {
        if (
          allShopping[i].bookId === allBooks[j].bookID &&
          allShopping[i].userId === allUsers[x].userID
        ) {
          newList.push({
            userId: allShopping[i].userId,
            bookTitle: allBooks[j].Title,
            totalBooks: allShopping[i].totalBooks,
            totalPrice: allShopping[i].totaAmount,
            originalPrice: allShopping[i].originalPrice,
            sellDate: allShopping[i].soldDate,
            userFirstName: allUsers[x].Name,
            imagePath: allBooks[j].ImagePath,
            bookId: allBooks[j].bookID,
          });
        }
      }
    }
  }

  let totalShoppingCar = await getAllShoppingCarModel.getAllShoppingCar(userId);

  let totalPrice = 0;
  let totalBooks = 0;
  //SUMO EL PRECIO TOTAL DE TODOS LOS LIBROS Y EL TOTAL DE LAS UNIDADES
  for (let i = 0; i < totalShoppingCar.length; i++) {
    totalPrice += totalShoppingCar[i].totalPrice;
    totalBooks += Number(totalShoppingCar[i].bookAmount);
  }
  //REDONDEO EL NUMERO A SOLO DOS DECIMALES DESPUES DEL PUNTO
  totalPrice = parseFloat(totalPrice.toFixed(2));

  // console.log("Mi nueva lista", newList);
  let dates = new Set();
  for( let i = 0; i < newList.length; i++ ){
    dates.add(newList[i].sellDate);
  }

  res.render("SpecificSell", {
    result: newList,
    session: req.session,
    message: "",
    nameSearched: undefined,
    totalNoti: totalBooks,
    dates: dates,
  });
};

module.exports = { getAllSells, getAllUsersSells, getAllSellsByDate };
