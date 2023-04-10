const { sql } = require("../connection.model");

const ActivateUserByAdmin = async (userId) => {
    try{
        let trueEmail = "true";
        let result = await sql.query(
            `UPDATE Users SET EmailConfirmed = '${trueEmail}' WHERE userID = ${userId}`
        );

        return true;
    }catch(error){
        console.log("Ocurrio un error en ActivateUserByAdmin.Model: ", error);
    }
};

module.exports = { ActivateUserByAdmin, };