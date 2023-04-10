const express = require("express");
const router = express.Router();
const session = require("express-session");
const { likeComment, dislikeComment } = require("../../Model/comments/likesComments.Model");

const LikeComment = async (req, res) => {
    let userId = req.session.userId;
    let commentId = req.body.commentId;
    let bookId = req.body.commnetBookId;
    
    let result = await likeComment( userId, commentId, bookId );

    if(result){
        return res.redirect(`BooksInformation?bookID=${bookId}`);
    }else{
        return res.redirect(`BooksInformation?bookID=${bookId}`);
    }
};

const DisLikeComment = async (req, res) => {
    let userId = req.session.userId;
    let commentId = req.body.commentId;
    let bookId = req.body.commnetBookId;
    
    let result = await dislikeComment( userId, commentId, bookId );

    if(result){
        return res.redirect(`BooksInformation?bookID=${bookId}`);
    }else{
        return res.redirect(`BooksInformation?bookID=${bookId}`);
    }
};

module.exports = { LikeComment,DisLikeComment };