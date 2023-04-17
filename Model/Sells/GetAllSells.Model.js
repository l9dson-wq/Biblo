const { sql } = require("../connection.model");

const GetAllSells = async (fechaHoy) => {
    try{
        let result = await sql.query(
            `SELECT * FROM Shopping`
        );

        let resultUser = await sql.query(
            `SELECT * FROM Users`
        );

        let resultBooks = await sql.query(
            `SELECT * FROM Books`
        );

        return({
            shopping: result.recordset,
            users: resultUser.recordset,
            books: resultBooks.recordset,
        });
    }catch(error){
        console.log("There was an error in GetAllSells.Model: ", error);
    }
};

const getSpecificSells = async (fecha) => {
    console.log("esta es la fecha: ", fecha);
    try{
        let result = await sql.query(
            `SELECT * FROM Shopping WHERE soldDate = '${fecha}'`
        );

        let resultUser = await sql.query(
            `SELECT * FROM Users`
        );

        let resultBooks = await sql.query(
            `SELECT * FROM Books`
        );

        return({
            shopping: result.recordset,
            users: resultUser.recordset,
            books: resultBooks.recordset,
        });
    }catch(error){
        console.log("Ocurrio un error en getSpecificSells: ", error);
    }
};

const GetAllUsersSells = async ( userId ) => {
    try{
        let result = await sql.query(
            `SELECT * FROM Shopping WHERE userId = ${userId}`
        );

        let resultUser = await sql.query(
            `SELECT * FROM Users WHERE userID = ${userId}`
        );

        let resultBooks = await sql.query(
            `SELECT * FROM Books`
        );

        return({
            shopping: result.recordset,
            users: resultUser.recordset,
            books: resultBooks.recordset,
        });
    }catch(error){
        console.log("There was an error in GetAllSells.Model: ", error);
    }
};

module.exports = { GetAllSells, GetAllUsersSells, getSpecificSells, };