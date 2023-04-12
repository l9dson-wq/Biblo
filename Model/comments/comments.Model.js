const { sql } = require("../connection.model");

const SaveComment = async (userId, commentText, date, bookId, userName) => {
  console.log(userId, commentText, date, bookId);
  try {
    await sql.query(
      `INSERT INTO userComments (userId, bookId, userFullName, commentText, commentDate, totalLikes, totalDisLikes) VALUES (${userId}, ${bookId}, '${userName}', '${commentText}', '${date}', 0, 0)`
    );
    return true;
  } catch (error) {
    console.log("ha ocurrido un error en comments.model: ", error);
  }
};

const GetComments = async (userId, bookId) => {
  try {
    let resultComments = await sql.query(
      `SELECT * FROM userComments WHERE bookId = ${bookId}`
    );

    //console.log(result);
    return resultComments.recordset;
  } catch (error) {
    console.log("ha ocurrido un error en comments.model: ", error);
  }
};

const GetAllComments = async () => {
  try{
    let result = await sql.query(
      `SELECT * FROM userComments`
    );
    return result.recordset;
  }catch(error){
    console.log("ha ocurrido un error en comments.model: ", error);
  }
};

module.exports = { SaveComment, GetComments, GetAllComments };
