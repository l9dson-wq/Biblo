const express = require("express");
const router = express.Router();
const session = require("express-session");
const editBookInformationModel = require("../../Model/Books/EditBook.Model");
const fs = require("fs");

var imagePathGot;

const getBookInformation = async (req, res) => {
  let bookID = req.body.bookId;

  try {
    let result = await editBookInformationModel.getBookAllInformation(bookID);

    imagePathGot = result[0].ImagePath;

    return res.render("EditBook", {
      book: result[0],
      session: req.session,
      message: "",
      nameSearched: undefined,  
    });
  } catch (error) {
    console.log(error);
  }
};

const editingBookInformation = async (req, res) => {
  let title = req.body.title;
  let author = req.body.autor;
  let description = req.body.description;
  let year = req.body.year;
  let price = req.body.price;
  let stock = req.body.stock;
  let imagePath2 = req.body.image2;
  let bookId = req.body.bookIdView;

  let imageToChange;

  //console.log(imagePath2);
  //console.log(imagePathGot);

  const file = req.file;

  //console.log(file);

  if (file !== undefined) {
    if (!file) {
      return res.status(400).send("No se seleccionó ninguna imagen");
    }

    rutaArchivo = "uploads/" + file.originalname;
    imageToChange = rutaArchivo;

    console.log(rutaArchivo);

    fs.rename(file.path, "public/uploads/" + file.originalname, (err) => {
      if (err) throw err;
    });
  } else {
    imageToChange = imagePath2;
  }

  try {
    let result = await editBookInformationModel.editBookInformation(
      imageToChange,
      title,
      author,
      description,
      year,
      price,
      stock,
      req.session.userId,
      bookId
    );

    res.redirect(`BooksInformation?bookID=${bookId}`);
  } catch (error) {
    console.log("ocurrio un error en EditBooks.Controller: ", error);
  }
};

module.exports = { getBookInformation, editingBookInformation };
