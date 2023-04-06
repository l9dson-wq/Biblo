require('dotenv').config();
const sql = require('mssql');

const config = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    server: process.env.DB_SERVER, 
    database: process.env.DB_NAME,
    encrypt: false,
    trustedConnection: true,
};

async function connect(){
  try{
    let pool = await sql.connect(config);
    console.log('Conexion exitosa!');
  }catch(error){
    console.log('Error al conectarse a la base de datos: ', error);
  }
}

connect();
module.exports = { connect, sql };