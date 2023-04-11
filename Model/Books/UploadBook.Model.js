const { sql } = require("../connection.model");

const uploadBook = async (
  imagePath,
  title,
  author,
  description,
  year,
  price,
  stock,
  createdBy,
  totalPages,
  bookLanguage,
  genre1,
  genre2,
  genre3,
  fechaHoy
) => {
  try {
    await sql.query(
      `INSERT INTO Books 
      (ImagePath, Title, Autor, Description, PublishedYear, Price, Stock, BookedByID, bookPages, bookLanguages, firstGenre, secondGenre, thirdGenre, createdDate) 
      VALUES 
      ('${imagePath}','${title}','${author}','${description}',${year},${price},${stock},${createdBy},${totalPages},'${bookLanguage}','${genre1}','${genre2}','${genre3}','${fechaHoy}')`
    );

    return `${title}  fue agregado correctamente`;
  } catch (error) {
    console.log(" Ocurrio un error en UploadBook.Model: ", error);
  }
};

module.exports = { uploadBook };
