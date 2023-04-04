const express = require("express");
const router = express.Router();
const { insertUser } = require("../../Model/User/RegisterUser.Model");

const SavaUserData = async (req, res) => {
  try {
    let nombre = req.body.nombre;
    let correo = req.body.correo;
    let userName = req.body.userName;
    let password = req.body.password;

    let result = await insertUser(nombre, correo, userName, password);

    res.send(`Resultado: ${result}`);
  } catch (error) {
    console.log(`Ocurrio un error en SaveUserData: ${error}`);
  }
};

module.exports = { SavaUserData, };
