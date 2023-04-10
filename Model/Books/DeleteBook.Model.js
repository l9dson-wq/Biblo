const { sql } = require('../connection.model');

const DeleteBook = async (bookID) => {
    try{
        await sql.query(`DELETE FROM Books WHERE bookID = ${bookID}`);
        return `Libro Eliminado con exito!`;
    }catch(error){
        console.log(`Ocurrio un error en DeleteBook.Model: ${error}`);
    }
};

module.exports = { DeleteBook, };