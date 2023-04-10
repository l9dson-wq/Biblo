const { sql } = require("../connection.model");

const getBookInformation = async (bookID) => {
    try{
        let result = await sql.query(`SELECT * FROM Books WHERE bookID = ${bookID}`);
        console.log(result.recordset);
        result.recordset[0].Price = result.recordset[0].Price.toFixed(2);
        return result.recordset;
    }catch(error){
        console.log("ocurrio un error en GetBookInformation.Model: ", error);
    }
};

module.exports = { getBookInformation, };