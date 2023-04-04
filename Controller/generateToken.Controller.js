const crypto = require('crypto');

const token = crypto.randomBytes(20).toString('hex');

function sendToken(){
    return token;
    //console.log(token );
}

//exportamos la funcion que compartira el token
module.exports = { sendToken };