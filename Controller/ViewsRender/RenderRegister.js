const express = require("express");
const router = express.Router();

const RenderRegister = (req, res) => {
    if(req.session && req.session.userId){
        return res.redirect('Home');
    }else{
        res.render('Register');
    }
};

module.exports = { RenderRegister, };