const {sql} = require('../connection.model');

async function getAllUsers() {
    try{
        let result = await sql.query(`SELECT * FROM Users`);
        return result.recordset;
    }catch(error){
        return error;
    }
}

module.exports = { getAllUsers };