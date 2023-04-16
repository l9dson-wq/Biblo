const express = require("express");
const router = express.Router();
const session = require("express-session");
const GetAllBooksModel = require("../../Model/Books/GetAllBooks.Mode");
const getAllShoppingCarModel = require("../../Model/Books/ShoppingCar.Model");
const commentsModel = require("../../Model/comments/comments.Model");

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

  let bookComments = await commentsModel.GetAllComments();
  for (let i = 0; i < books.length; i++) {
    books[i].comments = 0; // inicializa la propiedad "comments" en 0
    for (let j = 0; j < bookComments.length; j++) {
      if (books[i].bookID === bookComments[j].bookId) {
        books[i].comments += 1;
      }
    }
  }

  //Descuento
  //SACANDO EL PORCENTAJE
  for(let i = 0; i < books.length; i++){
    if( books[i].Stock <= 5 && books[i].Stock > 0){
      books[i].Discount = parseFloat((85 * parseFloat(books[i].Price)) / 100).toFixed(2);
    }
  }

  console.log(books);

  //console.log("comentarios: ", bookComments);

  // console.log(books);

  // ----
  let totalShoppingCar = await getAllShoppingCarModel.getAllShoppingCar(userID);
  let totalShoppingCarNumber = Number(totalShoppingCar.result.length);
  console.log(totalShoppingCarNumber);

  let totalPrice = 0;
  let totalBooks = 0;

  //SUMO EL PRECIO TOTAL DE TODOS LOS LIBROS Y EL TOTAL DE LAS UNIDADES
  for (let i = 0; i < totalShoppingCar.result.length; i++) {
    totalPrice += totalShoppingCar.result[i].totalPrice;
    totalBooks += Number(totalShoppingCar.result[i].bookAmount);
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
    bookComments: bookComments, 
  });
};

//Peticiones con filtros
const RenderBooksFilters = async (req, res) => {
  let stockSelected = req.body.optionsCheckbox;
  let searchName = req.body.searchName;
  let books;
  let userID = req.session.userId;

  if (stockSelected === "" || stockSelected === undefined) {
    books = await GetAllBooksModel.GetlAllBookWithFilters(searchName, true);
  } else if (searchName === "" || searchName === undefined) {
    books = await GetAllBooksModel.GetlAllBookWithFilters(stockSelected, false);
  } else {
    return res.redirect("BooksIndex");
  }

  console.log(books);

  let booksNew = books.result.map((book) => {
    return {
      ...book,
      //Title: book.Title.substring(0, 30),
      Description: book.Description.substring(0, 100),
    };
  });

  let bookComments = await commentsModel.GetAllComments();
  for (let i = 0; i < booksNew.length; i++) {
    booksNew[i].comments = 0; // inicializa la propiedad "comments" en 0
    for (let j = 0; j < bookComments.length; j++) {
      if (booksNew[i].bookID === bookComments[j].bookId) {
        booksNew[i].comments += 1;
      }
    }
  }

    //Descuento
  //SACANDO EL PORCENTAJE
  for(let i = 0; i < booksNew.length; i++){
    if( booksNew[i].Stock <= 5 && booksNew[i].Stock > 0){
      booksNew[i].Discount = parseFloat((85 * parseFloat(booksNew[i].Price)) / 100).toFixed(2);
    }
  }

  // ----
  let totalShoppingCar = await getAllShoppingCarModel.getAllShoppingCar(userID);
  let totalShoppingCarNumber = Number(totalShoppingCar.result.length);
  console.log(totalShoppingCarNumber);

  let totalPrice = 0;
  let totalBooks = 0;

  //SUMO EL PRECIO TOTAL DE TODOS LOS LIBROS Y EL TOTAL DE LAS UNIDADES
  for (let i = 0; i < totalShoppingCar.result.length; i++) {
    totalPrice += totalShoppingCar.result[i].totalPrice;
    totalBooks += Number(totalShoppingCar.result[i].bookAmount);
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
    booksList: booksNew,
    message: books.errorMessage,
    nameSearched: searchName,
    totalNoti: totalBooks,
    fechaHoy: fechaHoy,
    bookComments: bookComments, 
  });
};

module.exports = { RenderBookIndex, RenderBooksFilters };
