require('dotenv').config();
const nodemailer = require("nodemailer");

var emailForConfirmation;
var nameForConfirmation;
var tokenReceived;
var confirmationLink;

function setTokenReceived(token){
    tokenReceived = token;
    
    confirmationLink = `http://localhost:5000/confirmar-correo?token=${tokenReceived}`;
}

function getEmailInformation(correo, name) {
  emailForConfirmation = correo;
  nameForConfirmation = name;

  console.log(emailForConfirmation, " - ", nameForConfirmation);

  // Configurar el transportador SMTP
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  // Configurar el correo electrónico
  const mailOptions = {
    from: "andelsonlopez13@gmail.com",
    to: emailForConfirmation,
    subject: `Bienvenido ${nameForConfirmation} a Biblo`,
    text: `Para poder continuar totalmente con tu registro en Biblo tienes que confirmar el siguiente link: ${confirmationLink}`,
  };

  // Enviar el correo electrónico
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log("Error al enviar el correo electrónico:", error);
    } else {
      console.log("Correo electrónico enviado:", info.response);
    }
  });
}

module.exports = { getEmailInformation, setTokenReceived };