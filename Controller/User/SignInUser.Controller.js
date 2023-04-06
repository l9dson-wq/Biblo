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
    let userValidPassword;
    let inputValid = "";

    let userInformation = await validateUserData(uName, password);
    console.log(userInformation.result);

    if (userInformation.userFound === false) {
      emailConfirmationBool = false;
      userFound = false;
      inputValid = "is-invalid";

      return res.render("SignIn", {
        emailConfirmation: emailConfirmationBool,
        userFound: userFoundBool,
        inputValid: inputValid,
        validPassword: userValidPassword,
      });
    } else {
      if (!userInformation.isValidPassword) {
        userValidPassword = false;
        userFound = true;
        inputValid = "is-invalid";
        emailConfirmationBool =
          userInformation.result["EmailConfirmed"] === "true" ? true : false;

        return res.render("SignIn", {
          emailConfirmation: emailConfirmationBool,
          userFound: userFoundBool,
          inputValid: inputValid,
          validPassword: userValidPassword,
        });
      }

      if (userInformation.userFound && userInformation.isValidPassword) {
        //agregando la sesion ( se podria serparar en una funcion a parte)
        let userGot = userInformation.result;
        req.session.userId = userGot.userID;
        req.session.Name = userGot.Name;
        req.session.Email = userGot.Email;
        req.session.Role = userGot.UserRole;

        return res.redirect("Home");
      }
    }

    res.render("SignIn", {
      emailConfirmation: emailConfirmationBool,
      userFound: userFoundBool,
      inputValid: inputValid,
      validPassword: userValidPassword,
    });
  } catch (error) {
    console.log(`Ocurrio un error en SignInUser.Controller: ${error}`);
  }
};

module.exports = { UserSignIn };
