const sql = require('mssql');

const config = {
    user: 'riven',
    password: 'admin',
    server: 'DESKTOP-8I7EO41', //change it if it's not your server
    database: 'Testing',
    encrypt: false,
    trustedConnection: true,
};

async function connect(){
  try{
    let pool = await sql.connect(config);
    console.log('Conexion exitosa!');
  }catch(error){
    console.log('Erro al conectarse a la base de datos: ', error);
  }
}

connect();
module.exports = { connect, sql };