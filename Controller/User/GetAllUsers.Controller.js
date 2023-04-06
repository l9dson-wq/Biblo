const express = require("express");
const router = express.Router();
const {getAllUsers} = require('../../Model/User/AllUsers.Model');
const session = require("express-session");

const getUsers = async (req, res) => {
    try{
        const users = await getAllUsers();

        if( req.session.Role !== 'Admin'){
            return res.redirect('/Home');
        }

        res.render('Index', { resultList: users });
    }catch(error){
        console.log(error);
    }
};

module.exports = { getUsers, };