const express = require("express");
const router = express.Router();
const session = require("express-session");
const { validateUserData } = require("../../Model/User/SignInUser.Model");

const UserSignIn = async (req, res) => {
  try {
    let uName = req.body.userName;
    let password = req.body.password;

    let emailConfirmationBool;
    let userFoundBool;
    let inputValid = '';

    let userInformation = await validateUserData(uName, password);

    if (userInformation.recordset.length === 0) {
      emailConfirmationBool = false;
      userFoundBool = false;
      inputValid = 'is-invalid'
    }

    if (userInformation.recordset.length !== 0) {
      if (userInformation.recordset[0].EmailConfirmed === "false") {
        emailConfirmationBool = false;
        userFoundBool = true;
      } else {
        emailConfirmationBool = true;
        userFoundBool = true;

        //agregando la sesion ( se podria serparar en una funcion a parte)
        let userGot = userInformation.recordset[0];
        req.session.userId = userGot.userID;
        req.session.Name = userGot.Name;
        req.session.Email = userGot.Email;

        return res.redirect('Home');
      }
    }

    res.render("SignIn", {
      emailConfirmation: emailConfirmationBool,
      userFound: userFoundBool,
      inputValid: inputValid,
    });
  } catch (error) {
    console.log(`Ocurrio un error en SignInUser.Controller: ${error}`);
  }
};

module.exports = { UserSignIn };
