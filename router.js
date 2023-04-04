const express = require("express");
const router = express.Router();
const SavaUserDataController = require("./Controller/User/RegisterUser.Controller");
const setEmailConfirmationController = require("./Controller/Email/EmailConfirmation.Controller");
const userController = require("./Controller/User/GetAllUsers.Controller");
const GetByUserNameController = require("./Controller/User/GetByUserName.Controller");
const RenderRegisterController = require("./Controller/ViewsRender/RenderRegister");
const RenderSignInController = require("./Controller/ViewsRender/RenderSignIn.Controller");
const UserSignInController = require('./Controller/User/SignInUser.Controller');
const isAuthenticatedController = require('./Controller/session/AuthSession.Controller');
const RenderHomeController = require('./Controller/ViewsRender/RenderHome');

router.get("/", isAuthenticatedController.isAuthenticated, userController.getUsers);

//Solamente renderiza el "ejs" register a peticion del usuario
router.get("/Register", RenderRegisterController.RenderRegister);

//renderizacion del inicio de sesion
router.get("/SignIn", RenderSignInController.RenderSignIn);

//Obtener usuario por medio del userName
router.post("/comparar", GetByUserNameController.getUserByUserName);

//intento de insertar usuarios
router.post("/guardar-datos", SavaUserDataController.SavaUserData);

//Inicio de sesion
router.post("/SignIn", UserSignInController.UserSignIn);

//Cerrar sesion
router.get("/Logout", (req, res) => {
  //Se borran todas las variables de session
  req.session.destroy(error => {
    if (error) {
      console.log(error);
    }else{
      res.redirect('/SignIn');
    }
  })
});

// Ruta para manejar la confirmación del correo electrónico
router.get(
  "/confirmar-correo",
  setEmailConfirmationController.setEmailConfirmation
);

//Ruta protegida por session
router.get("/Home", isAuthenticatedController.isAuthenticated,  RenderHomeController.RenderHome);

module.exports = router;
