const express = require('express');
const db = require('./db.js'); // connection variable
const query = require('./queries');
var session = require('express-session');
var cookieParser = require('cookie-parser');
const bcrypt = require ('bcrypt'); // bcrypt

const route = express.Router();


route.get('/',(req,res)=>{
    res.sendFile("login.html",{root: __dirname})
})

route.post('/',(req,res)=>{

const{username,password} = req.body
 
var values = [username];

function hasAccess(result){
  if (result) {

    console.log("Access Granted!");
    res.redirect('/login')
  }
  else {
    console.log("Access Denied!");
    res.send('parola incorecta')
  }
}

db.query(query.statement_Select, values, function(err, res) {
  if (err) throw err;
  else {
    var hash = res.rows[0].password;

    bcrypt.compare(password, hash, function(err, result) {
      hasAccess(result);
    });
  }
});

console.log(req.session.username);


})

module.exports = route;