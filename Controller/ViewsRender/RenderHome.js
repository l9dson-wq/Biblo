const express = require("express");
const router = express.Router();
const session = require("express-session");

const RenderHome = (req, res) => {
    res.render('Home', { session: req.session });
};

module.exports = { RenderHome, };