const express = require("express");
const router = express.Router();
const session = require("express-session");

const RenderBooksRegistration = (req, res) => {
  if (req.session && req.session.userId) {
    res.render("BooksRegistration", {
      userRole: req.session.Role,
    });
  } else {
    return res.redirect("/SignIn");
  }
};

module.exports = { RenderBooksRegistration };