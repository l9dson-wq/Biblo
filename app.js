const express = require("express");
const bodyParse = require("body-parser");
const app = express();
const session = require("express-session");
const { sendToken } = require("./Controller/generateToken.Controller");
const helmet = require("helmet");
const nocache = require("nocache");
const multer = require("multer");

app.use(
  session({
    secret: sendToken(),
    resave: false,
    saveUninitialized: false,
  })
);

// Configurar multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/uploads"); // Carpeta donde se guardará la imagen
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname); // Nombre de archivo único
  },
});
const upload = multer({ storage: storage });

app.use(upload.single("image"));

app.use(nocache());

app.use(express.static("public"));

app.set("view engine", "ejs");

//capturar los datos
app.use(express.urlencoded({ extended: true }));

app.use("/", require("./router"));

app.listen(5000, () => {
  console.log("Todo esta funcionando bien! en http://localhost:5000");
});
