const express = require('express');
const bodyParse = require('body-parser');
const app = express();
const session = require('express-session');
const { sendToken } = require('./Controller/generateToken.Controller');

app.use(session({
    secret: sendToken(),
    resave: false, 
    saveUninitialized: false,
}));

app.set('view engine', 'ejs');

//capturar los datos
app.use(express.urlencoded({extended:true}));

app.use('/', require('./router'));

app.listen(5000, ()=>{
    console.log('Todo esta funcionando bien! en http://localhost:5000');
});