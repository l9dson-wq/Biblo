const { sql } = require("../connection.model");

const getBookInformation = async (bookID) => {
    try{
        let result = await sql.query(`SELECT * FROM Books WHERE bookID = ${bookID}`);
        return result.recordset;
    }catch(error){
        console.log("ocurrio un error en GetBookInformation.Model: ", error);
    }
};

module.exports = { getBookInformation, };