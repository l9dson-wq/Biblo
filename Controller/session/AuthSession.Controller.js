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

const isAuthenticatedAsAdmin = (req, res, next) => {
  if (req.session && req.session.userId && req.session.Role === "Admin") {
    return next();
  } else {
    res.redirect("/Home");
  }
};

module.exports = { isAuthenticated, isAuthenticatedAsAdmin, };