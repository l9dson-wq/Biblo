const express = require("express");
const router = express.Router();
const session = require("express-session");

const userLogout = (req, res) => {
    req.session.destroy(error => {
        if (error) {
          console.log(error);
        }else{
          res.redirect('/SignIn');
        }
      })
};

module.exports = {
    userLogout
};