const express = require("express");
const router = express.Router();
const session = require("express-session");
const fs = require("fs");
const uploadBookModel = require("../Model/Books/UploadBook.Model");

var rutaArchivo;

const uploadFile = async (req, res) => {
  const file = req.file;

  if(file){
    if (!file) {
      return res.status(400).send("No se seleccionó ninguna imagen");
    }
  
    rutaArchivo = "uploads/" + file.originalname;
  
    console.log(rutaArchivo);
  
    fs.rename(file.path, "public/uploads/" + file.originalname, (err) => {
      if (err) throw err;
    });
  }else{
    rutaArchivo = '/uploads/coverBooks.jpg';
  }

  let title = req.body.title;
  let author = req.body.autor;
  let description = req.body.description;
  let year = req.body.year;
  let price = req.body.price;
  let stock = req.body.stock;
  let genre1 = req.body.genre1;
  let genre2 = req.body.genre2;
  let genre3 = req.body.genre3;
  let totalPages = req.body.bookPages;
  let bookLanguage = req.body.bookLanguage;

  price = parseFloat(price);

  let result = await uploadBookModel.uploadBook(
    rutaArchivo,
    title,
    author,
    description,
    year,
    price,
    stock,
    req.session.userId,
    totalPages,
    bookLanguage,
    genre1,
    genre2,
    genre3,
  );

  res.redirect("BooksIndex");
};

module.exports = { uploadFile };