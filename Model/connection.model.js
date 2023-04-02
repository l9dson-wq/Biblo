const sql = require('mssql');

const config = {
    user: 'testing',
    password: 'admin',
    server: 'DESKTOP-8I7EO41', //change it if it's not your server
    database: 'Testing',
    encrypt: false,
    trustedConnection: true,
};

async function connect() {
    try {
        let pool = await sql.connect(config);
        console.log('Conectado a la base de datos');
    } catch (err) {
        console.log('Error al conectarse a la base de datos:', err);
    }
}

connect();