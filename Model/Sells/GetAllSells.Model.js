const { sql } = require("../connection.model");

const GetAllSells = async (fechaHoy) => {
    try{
        let result = await sql.query(
            `SELECT * FROM Shopping`
        );
        console.log("resultado de las compras de hoy: ", result.recordset);

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

const GetAllUsersSells = async (fechaHoy, userId ) => {
    try{
        let result = await sql.query(
            `SELECT * FROM Shopping WHERE soldDate = '${fechaHoy}' AND userId = ${userId}`
        );
        console.log("resultado de las compras de hoy: ", result.recordset);

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