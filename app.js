const express = require('express');
const exphbs=require('express-handlebars');
const bodyparser=require('body-parser');
const mysql=require('mysql');
const req = require('express/lib/request');

require('dotenv').config();

const app= express();

const port = process.env.PORT || 5000;

//Parsing widdlware
//Parse application/x-www-form-urlencoded
app.use(bodyparser.urlencoded({extended:false}));

//Parse application
app.use(bodyparser.json());

//Statistic files
app.use(express.static('public'));

//templating Engine
app.engine('hbs', exphbs.engine({extname: '.hbs'}));
app.set('view engine','hbs');

//Connection pool
const pool = mysql.createPool({
    connectionLimit :100,
    host            :process.env.DB_HOST,
    user            :process.env.DB_USER,
    password        :process.env.DB_PASS,
    database        :process.env.DB_NAME
});

//Connect to DB
pool.getConnection((err,connection)=>{
if(err) throw err;//not connected
console.log('Connect as ID :'+connection.threadId);
})

const routes = require ('./server/routes/etudiant');
app.use('/',routes);
app.listen(port,()=> console.log('Listening on port 5000'));