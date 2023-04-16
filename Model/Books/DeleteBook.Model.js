const { sql } = require('../connection.model');

const DeleteBook = async (bookID) => {
    try{
        //ELIMINO EL LIBRO DE LA TABLA Books.
        await sql.query(`DELETE FROM Books WHERE bookID = ${bookID}`);

        //DEBO ELIMINARLO DE LA CESTA TAMBIEN EN TODO CASO.
        await sql.query(`DELETE FROM ShoppingCar WHERE bookId = ${bookID}`);

        //TAMBIEN DEBE ELIMINAR DE FAVORITOS DE CUALQUIER PERSONA.
        await sql.query(`DELETE FROM Favorites WHERE bookId = ${bookID}`);

        return `Libro Eliminado con exito!`;
    }catch(error){
        console.log(`Ocurrio un error en DeleteBook.Model: ${error}`);
    }
};

module.exports = { DeleteBook, };