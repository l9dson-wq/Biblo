const express = require("express");
const router = express.Router();
const { getUserName } = require("../../Model/User/GetByUserName.Model");

const getUserByUserName = async (req, res) => {
  try {
    let dato = req.body.dato;

    const user = await getUserName(dato);

    //console.log(user.recordset);

    if (user === undefined) {
      res.render("Alerts", {
        datoFalse: "Los datos no coinciden",
        userGotIt: undefined,
        userFound: false,
      });
    } else {
      res.render("Alerts", {
        datoFalse: "Los datos coinciden",
        userGotIt: user.recordset[0],
        userFound: true,
      });
    }
  } catch (error) {
    console.log("Ha ocurrido un error en getUserByUserName: ", error);
  }
};

module.exports = { getUserByUserName, };