const express = require('express');
const route = express.Router();
var session = require('express-session');
var cookieParser = require('cookie-parser');
const db = require('./db'); 
const query = require('./queries')
const bcrypt = require ('bcrypt'); // bcrypt



route.get('/',(req,res)=>{
    res.sendFile("./register.html",{root: __dirname})
})


route.post('/',(req,res)=>{

    const  {username,email,password} = req.body

    const saltRounds = 10; // data processing time

    function acces(result)
    {
       if(result)
       {
         res.send('succes')
       }
       else{
         res.send('failed')
       }
    }

    
    bcrypt.hash(password, saltRounds, function(err, hash) {

      let values = [username,hash,email]; 

      db.query(query.statement_Insert, values, function(err,result) {
        if (err) throw err; 
        
        else {
              acces(result)
            }
      });
    });
    req.session.user = username;
    console.log(req.session.user);

    console.log(req.session.username);

})

 


module.exports = route;
