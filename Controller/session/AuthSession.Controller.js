const express = require("express");
const router = express.Router();
const session = require("express-session");

const isAuthenticated = (req, res, next) => {
  if (req.session && req.session.userId) {
    return next();
  } else {
    res.redirect("/SignIn");
  }
};

module.exports = { isAuthenticated, };