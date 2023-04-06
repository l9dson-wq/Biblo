const express = require("express");
const router = express.Router();
const session = require("express-session");
const GetAllBooksModel = require('../../Model/Books/GetAllBooks.Mode');

const RenderBookIndex = async (req, res) => {
    let books = await GetAllBooksModel.GetAllBooks();
    console.log(books);
    res.render('BooksIndex', { session: req.session, booksList: books });
};

module.exports = { RenderBookIndex, };