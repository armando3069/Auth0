const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
var multer = require('multer');
var upload = multer(); 
var session = require('express-session');
var cookieParser = require('cookie-parser');
const regis = require('./register')
const path = require('path')
const login = require('./login');
const app = express();

app.use(express.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname ,"public")));
app.use(upload.array());
app.use(cookieParser());
app.use(session({secret: "Your secret key"}));


app.use('/register',regis);
app.use('/login',login);





app.get('/',(req,res)=>{
    res.send('<center><h1>Wellcome to Authentication</h1><center>')
})

app.use((req,res)=>{
    res.status(404).sendFile("./404.html",{root: __dirname})
});


app.listen(3000,() => {
 console.log('run !');
})