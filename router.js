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
const LogoutController = require('./Controller/session/Logout.Controller');
const RenderBooksRegistrationController = require('./Controller/ViewsRender/RenderBooksRegistration');
const UploadFileController = require('./Controller/UploadFile.Controller');
const RenderBookIndexController = require('./Controller/ViewsRender/RenderBookIndex.Controller');

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

//Cerrar sesion ( MOVER TODO ESTO A UN ARCHIVO SERPARADO EN CONTROLLER/SESSION/)
router.get("/Logout", LogoutController.userLogout);

// Ruta para manejar la confirmación del correo electrónico
router.get(
  "/confirmar-correo",
  setEmailConfirmationController.setEmailConfirmation
);

//Ruta protegida por session
router.get("/Home", isAuthenticatedController.isAuthenticated,  RenderHomeController.RenderHome);

// Ruta para manejar la carga de archivos
router.post('/upload', UploadFileController.uploadFile);

router.get('/BooksRegistration', isAuthenticatedController.isAuthenticated, RenderBooksRegistrationController.RenderBooksRegistration);

// renderizar la vista de la lista de libros
router.get('/BooksIndex', isAuthenticatedController.isAuthenticated, RenderBookIndexController.RenderBookIndex );

module.exports = router;
