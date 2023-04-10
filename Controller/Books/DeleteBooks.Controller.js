const DeleteBookModel = require('../../Model/Books/DeleteBook.Model');

const DeleteBook = async (req, res) => {
    let bookID = req.body.bookId;

    try{
        await DeleteBookModel.DeleteBook(bookID);
        res.redirect("BooksIndex");
    }catch(error){
        console.log(`Ocurrio un error en DeleteBook.Controller: ${error}`);
    }
}

module.exports = { DeleteBook, };