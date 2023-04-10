const { sql } = require("../connection.model");

const shoppingCar = async (userId, bookId, bookTitle, bookImagePath, bookPrice) => {
    try{
        let result = await sql.query(
            `SELECT * FROM ShoppingCar WHERE bookId = ${bookId} AND userId = ${userId}`
        );

        if( result.recordset.length !== 0){
            await sql.query(
                `UPDATE ShoppingCar SET bookAmount = bookAmount + 1, totalPrice = totalPrice + ${bookPrice} WHERE shoppingCardId = ${result.recordset[0].shoppingCardId} `
            );
        }else{
            await sql.query(
                `INSERT INTO 
                ShoppingCar (bookId, userId, bookTitle, bookImagePath, bookPrice, bookAmount, totalPrice) 
                VALUES 
                (${bookId},${userId},'${bookTitle}','${bookImagePath}',${bookPrice}, 1, ${bookPrice})`
            );
        }
        
        return true;
    }catch( error ){
        console.log( "Ocurrio un error en ShoppingCarMOdel", error );
    }
};

module.exports = { shoppingCar, };