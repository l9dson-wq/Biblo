const express = require("express");
const router = express.Router();
const session = require("express-session");
const GetAllBooksModel = require("../../Model/Books/GetAllBooks.Mode");

const RenderBookIndex = async (req, res) => {
  let books = await GetAllBooksModel.GetAllBooks();
  //console.log(books);

  // limitar la propiedad 'Title' a no más de 10 caracteres
  books = books.map((book) => {
    return {
      ...book,
      //Title: book.Title.substring(0, 30),
      Description: book.Description.substring(0, 100),
    };
  });

  res.render("BooksIndex", {
    session: req.session,
    booksList: books,
    message: "",
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
  });
};

module.exports = { RenderBookIndex, RenderBooksFilters };
