const express = require("express");
const router = express.Router();
const {getAllUsers} = require('../../Model/User/AllUsers.Model');

const getUsers = async (req, res) => {
    try{
        const users = await getAllUsers();
        res.render('Index', { resultList: users });
    }catch(error){
        console.log(error);
    }
};

module.exports = { getUsers, };