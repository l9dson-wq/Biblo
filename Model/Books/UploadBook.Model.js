const { sql } = require("../connection.model");

const uploadBook = async (
  imagePath,
  title,
  author,
  description,
  year,
  price,
  stock,
  createdBy
) => {
  try {
    await sql.query(
      `INSERT INTO Books (ImagePath, Title, Autor, Description, PublishedYear, Price, Stock, BookedByID) 
      VALUES ('${imagePath}','${title}','${author}','${description}',${year},${price},${stock},${createdBy})`
    );

    return `${title}  fue agregado correctamente`;
  } catch (error) {
    console.log(" Ocurrio un error en UploadBook.Model: ", error);
  }
};

module.exports = { uploadBook };
