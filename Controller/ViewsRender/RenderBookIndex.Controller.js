const express = require("express");
const router = express.Router();
const session = require("express-session");
const GetAllBooksModel = require("../../Model/Books/GetAllBooks.Mode");
const getAllShoppingCarModel = require("../../Model/Books/ShoppingCar.Model");

const RenderBookIndex = async (req, res) => {
  let books = await GetAllBooksModel.GetAllBooks();
  let userID = req.session.userId;
  //console.log(books);

  // limitar la propiedad 'Title' a no más de 10 caracteres
  books = books.map((book) => {
    return {
      ...book,
      //Title: book.Title.substring(0, 30),
      Description: book.Description.substring(0, 100),
    };
  });

  // ----
  let totalShoppingCar = await getAllShoppingCarModel.getAllShoppingCar(userID);
  let totalShoppingCarNumber = Number(totalShoppingCar.length);
  console.log(totalShoppingCarNumber);

  let totalPrice = 0;
  let totalBooks = 0;

  //SUMO EL PRECIO TOTAL DE TODOS LOS LIBROS Y EL TOTAL DE LAS UNIDADES
  for (let i = 0; i < totalShoppingCar.length; i++) {
    totalPrice += totalShoppingCar[i].totalPrice;
    totalBooks += Number(totalShoppingCar[i].bookAmount);
  }
  //REDONDEO EL NUMERO A SOLO DOS DECIMALES DESPUES DEL PUNTO
  totalPrice = parseFloat(totalPrice.toFixed(2));

  //Obtener la fecha en cierto formato
  let fecha = new Date();
  let dia = fecha.getDate().toString().padStart(2, '0');
  let mes = (fecha.getMonth() + 1).toString().padStart(2, '0');
  let anio = fecha.getFullYear().toString();

  let fechaHoy = dia + '/' + mes + '/' + anio;
  //Obtener la fecha en cierto formato

  res.render("BooksIndex", {
    session: req.session,
    booksList: books,
    message: "",
    nameSearched: undefined,
    totalNoti: totalBooks,
    fechaHoy: fechaHoy,
  });
};

//Peticiones con filtros
const RenderBooksFilters = async (req, res) => {
  let stockSelected = req.body.optionsCheckbox;
  let searchName = req.body.searchName;
  let books;

  if (stockSelected === "" || stockSelected === undefined) {
    books = await GetAllBooksModel.GetlAllBookWithFilters(searchName, true);
  } else if (searchName === "" || searchName === undefined) {
    books = await GetAllBooksModel.GetlAllBookWithFilters(stockSelected, false);
  } else {
    return res.redirect("BooksIndex");
  }

  let booksNew = books.result.map((book) => {
    return {
      ...book,
      //Title: book.Title.substring(0, 30),
      Description: book.Description.substring(0, 100),
    };
  });

  res.render("BooksIndex", {
    session: req.session,
    booksList: booksNew,
    message: books.errorMessage,
    nameSearched: searchName,
  });
};

module.exports = { RenderBookIndex, RenderBooksFilters };
