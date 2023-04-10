const { sql } = require("../connection.model");

const getFavorites = async (userID) => {
  try {
    let result = await sql.query(
      `SELECT * FROM Favorites WHERE userId = ${userID}`
    );
    // let books;
    // let imageLocation = [];

    //console.log(result.recordset);

    let bookId = result.recordset.map((item) => item.bookId);

    let imageLocationPromises = bookId.map(async (item) => {
      let queryResult = await sql.query(
        `SELECT * FROM Books WHERE bookID=${item}`
      );
      let book = queryResult.recordset[0];
      return {
        imageLocation: book.ImagePath,
        bookName: book.Title,
        bookId: book.bookID,
      };
    });

    let imageLocations = await Promise.all(imageLocationPromises);
    let booksName = imageLocations.map((item) => item.bookName);

    // console.log(booksName); // Array de nombres de libros

    // console.log(bookId);
    //console.log(imageLocations);

    return {
      booksName: booksName,
      imageLocations: imageLocations,
    };
  } catch (error) {
    console.log("occurio un error en FavoritesBooks.Modal", error);
  }
};

const addFavorite = async (bookId, userId) => {
  try {

    let verification = await sql.query(`SELECT * FROM Favorites WHERE bookId = ${bookId} AND userId = ${userId} `);
    let alreadyExist;

    if(verification.recordset.length > 0){
      console.log("Ya esta como favorito");
      alreadyExist = true;
    }else{
      console.log("No esta como favorito aun");
      alreadyExist = false;
    }

    if(alreadyExist){
      await sql.query(
        `DELETE FROM Favorites WHERE bookId = ${bookId} AND userId = ${userId}`
      );

      console.log("Se elimino de favoritos correctamente");
      return false;
    }

    await sql.query(
      `INSERT INTO Favorites (bookId, userId) VALUES (${bookId}, ${userId})`
    );

    return true;
  } catch (error) {
    console.log("Ocurrio un error en FavoritesBooks.Modal", error);
  }
};

const FavoriteExisted = async (bookId, userId) => {
  try {
    let result = await sql.query(`SELECT * FROM Favorites WHERE bookId = ${bookId} AND userId = ${userId} `);
    
    if(result.recordset.length > 0){
      console.log("Ya esta como favorito");
      return true;
    }else{
      console.log("No esta como favorito aun");
      return false;
    }
  } catch (error) {
    console.log("Ocurrio un error en FavoritesBooks.Modal", error);
  }
};

module.exports = { getFavorites, addFavorite, FavoriteExisted };