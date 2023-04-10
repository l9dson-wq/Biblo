const express = require("express");
const router = express.Router();
const session = require("express-session");
const { validateUserData } = require("../../Model/User/SignInUser.Model");

const UserSignIn = async (req, res) => {
  try {
    let uName = req.body.userName;
    let password = req.body.password;

    let userInformation = await validateUserData(uName, password);
    // Codigo de verificaciones en caso de que algo suceda!
    // console.log("La password es valida?: ", userInformation.isValidPassword);
    //console.log("El correo esta verificado?: ", userInformation.result.EmailConfirmed);

    if (userInformation.userFound === false) {
      return res.render("SignIn", {
        emailConfirmation: false,
        userFound: false,
        inputValid: "is-invalid",
      });
    }

    if (!userInformation.isValidPassword) {
      return res.render("SignIn", {
        userFound: true,
        inputValid: "is-invalid",
        validPassword: false,
      });
    }

    if (
      userInformation.isValidPassword === true &&
      userInformation.userFound === true &&
      userInformation.result.EmailConfirmed === "false"
    ) {
      return res.render("SignIn", {
        emailConfirmation: false,
        userFound: true,
        inputValid: "is-invalid",
        validPassword: true,
      });
    }

    if (
      userInformation.userFound &&
      userInformation.isValidPassword &&
      userInformation.result.EmailConfirmed === "true"
    ) {
      //agregando la sesion
      let userGot = userInformation.result;
      req.session.userId = userGot.userID;
      req.session.Name = userGot.Name;
      req.session.Email = userGot.Email;
      req.session.Role = userGot.UserRole;
      req.session.LastName = userGot.LastName;

      return res.redirect("Home");
    }

    res.render("SignIn", {
      emailConfirmation: true,
      userFound: true,
      inputValid: "is-invalid",
      validPassword: true,
    });
  } catch (error) {
    console.log(`Ocurrio un error en SignInUser.Controller: ${error}`);
  }
};

module.exports = { UserSignIn };