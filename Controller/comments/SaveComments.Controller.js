const express = require("express");
const router = express.Router();
const session = require("express-session");
const commentsModel = require("../../Model/comments/comments.Model");

const SaveComment = async (req, res) => {
    let userId = req.session.userId;
    let bookId = req.body.bookIdComment;
    let commentText = req.body.commentText;
    let userName = req.session.Name + " " + req.session.LastName;

    //Obtener la fecha en cierto formato
    let fecha = new Date();
    let dia = fecha.getDate().toString().padStart(2, '0');
    let mes = (fecha.getMonth() + 1).toString().padStart(2, '0');
    let anio = fecha.getFullYear().toString();

    let fechaHoy = dia + '/' + mes + '/' + anio;
    //Obtener la fecha en cierto formato

    console.log(userId);
    console.log(bookId);
    console.log(commentText);

    let result = await commentsModel.SaveComment(userId, commentText, fechaHoy, bookId, userName);

    if(result){
        res.send('Commentario guardado con exito!');
    }
};

module.exports = { SaveComment, };