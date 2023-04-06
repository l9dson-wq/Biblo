const express = require("express");
const router = express.Router();
const session = require("express-session");
const fs = require("fs");
const uploadBookModel = require("../Model/Books/UploadBook.Model");

var rutaArchivo;

const uploadFile = async (req, res) => {
  const file = req.file;
  
  if (!file) {
    return res.status(400).send("No se seleccionó ninguna imagen");
  }

  rutaArchivo = "uploads/" + file.originalname;

  console.log(rutaArchivo);

  fs.rename(file.path, "public/uploads/" + file.originalname, (err) => {
    if (err) throw err;
  });

  let title = req.body.title;
  let author = req.body.autor;
  let description = req.body.description;
  let year = req.body.year;
  let price = req.body.price;
  let stock = req.body.stock;

  let result = await uploadBookModel.uploadBook(rutaArchivo, title, author, description, year, price, stock, req.session.userId);

  res.send(result);
};

module.exports = { uploadFile };