const { sql } = require("../connection.model");

const likeComment = async (userId, commentId, bookId) => {
  try {
    let result = await sql.query(
      `SELECT * FROM LikesComments WHERE userId = ${userId} AND commentId = ${commentId} AND likeDone = 1`
    );

    console.log(result);

    if (result.recordset.length === 0) {
      await sql.query(
        `UPDATE userComments SET totalLikes = totalLikes + 1 WHERE commentID = ${commentId}`
      );

      await sql.query(
        `INSERT INTO LikesComments (userId, likeDone, disLikeDone, commentId, bookId) VALUES (${userId}, ${1}, ${0}, ${commentId}, ${bookId})`
      );

      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.log("Ocurrio un error en likesComments.Model: ", error);
  }
};

const dislikeComment = async (userId, commentId, bookId) => {
  try {
    let result = await sql.query(
      `SELECT * FROM LikesComments WHERE userId = ${userId} AND commentId = ${commentId} AND disLikeDone = 1`
    );

    if (result.recordset.length === 0) {
      await sql.query(
        `UPDATE userComments SET totalDisLikes = totalDisLikes + 1 WHERE commentID = ${commentId}`
      );

      await sql.query(
        `INSERT INTO LikesComments (userId, disLikeDone, commentId, bookId) VALUES (${userId}, ${1}, ${commentId}, ${bookId})`
      );

      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.log("Ocurrio un error en likesComments.Model: ", error);
  }
};

// const checkLikes = async (userId, commentsIds, bookId) => {
//   try {
//     // let result = await sql.query(`SELECT * FROM LikesComments WHERE userId = ${userId} AND bookId = ${bookId}`);
//     let result;
//     let listCommentsLike = [];
//     let listCommentsDisLike = [];

//     console.log(commentsIds);

//     for(let i = 0; i < commentsIds.length; i++){
//         result = await sql.query(`SELECT * FROM LikesComments WHERE userId = ${userId} AND commentId = ${commentsIds[i]} AND bookId = ${bookId} AND likeDone = 1`);
//         listCommentsLike.push(result);
//     }

//     for(let i = 0; i < commentsIds.length; i++){
//         result = await sql.query(`SELECT * FROM LikesComments WHERE userId = ${userId} AND commentId = ${commentsIds[i]} AND bookId = ${bookId} AND disLikeDone = 1`);
//         listCommentsDisLike.push(result);
//     }

//     return (
//         {likes: listCommentsLike[0].recordset, disLikes: listCommentsDisLike[0].recordset}
//         );
//   } catch (error) {
//     console.log("Ocurrion un error en likesComment.Model: ", error);
//   }
// };

module.exports = { likeComment, dislikeComment };
