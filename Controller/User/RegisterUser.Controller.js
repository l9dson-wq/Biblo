const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();
const { insertUser } = require("../../Model/User/RegisterUser.Model");
const fs = require("fs");

var nombre;
var apellido;
var correo;
var userName;
var password;
var result;
var userRole;

const SavaUserData = async (req, res) => {
  try {
    nombre = req.body.nombre;
    apellido = req.body.apellido;
    correo = req.body.correo;
    userName = req.body.userName;
    password = req.body.password;
    userRole = req.body.options;

    //hashing password
    const Rounds = 10;
    bcrypt.hash(password, Rounds, async (err, hash) => {
      result = await insertUser(nombre, apellido, correo, userName, hash, userRole);

      if(result.error){
        return res.redirect("/Register?userNameFound=true");
      }else{
        return res.redirect(`SignIn`);
      }
    });
  } catch (error) {
    console.log(`Ocurrio un error en SaveUserData: ${error}`);
  }
};

module.exports = { SavaUserData };
