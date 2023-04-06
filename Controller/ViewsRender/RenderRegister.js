const express = require("express");
const router = express.Router();
const session = require("express-session");

const RenderRegister = (req, res) => {
  if (req.session && req.session.userId && req.session.Role === "Admin") {
    return res.render("Register", {
      userRole: req.session.Role,
    });
  } else if (req.session && req.session.userId) {
    return res.redirect("/Home");
  } else {
    res.render("Register", {
      userRole: req.session.Role,
    });
  }
};

module.exports = { RenderRegister };