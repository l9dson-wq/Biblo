const { connect, sql } = require("../../Model/connection.model");
const ActivateUserByAdminModel = require("../../Model/User/ActivateUserByAdmin.Model");

const ActivateUserByAdmin = async (req, res) => {

    let userId = req.body.userIdInput;

    let result = await ActivateUserByAdminModel.ActivateUserByAdmin(userId);

    if( result ){
        return res.send('Usuario activado por administrador con exito');
    }else{
        return res.send('Usuario no activado devido a algun error');
    }
    
};

module.exports = { ActivateUserByAdmin, };