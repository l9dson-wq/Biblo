const { activateUserStatus } = require("../User/ActivateAccount.Controller");
const express = require("express");
const router = express.Router();

const setEmailConfirmation = async (req, res) => {
  const { token } = req.query;

  let result = await activateUserStatus(token);

  res.render("EmailConfirmation", {
    confirmationMessage:
      result,
  });
};

module.exports = { setEmailConfirmation };
