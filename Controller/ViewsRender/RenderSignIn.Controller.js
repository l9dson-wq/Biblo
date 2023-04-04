const express = require("express");
const router = express.Router();

const RenderSignIn = (req, res) => {
    if(req.session && req.session.userId){
        return res.redirect('Home');
    }else{
        res.render('SignIn');
    }
};

module.exports = { RenderSignIn };