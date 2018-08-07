//Returns a funcition
const express =require("express");

const startupDebugger = require('debug')('app:startup');
const dbDebugger = require('debug')('app:db');

//Middleware to be used with express
const helmet = require("helmet");

//Middleware to be used with express, logs httpd requests
const morgan = require("morgan");

const config = require("config");


// Returns an object, convention is to store in a variable called app
const app = express();

const logger = require('./middleware/logger.js');

const courses = require('./routes/courses');
const home = require('./routes/home');

console.log(`Node env is ${process.env.NODE_ENV}`) //Not set undefined
if (app.get('env') === 'development') {
    startupDebugger('Morgan enabled....');
    app.use(morgan('tiny'));
}

//db work
dbDebugger('Connected to the database...')

//Pug is a templating engine, and since it's in the second argument here, express loads the module for us. 
app.set('view engine', 'pug');
app.set('views', './views'); //default

//Used by app.post for body
//App.use is used for middleware.
app.use(express.json());
app.use(express.urlencoded({extended: true})); //key=value&key=value
app.use(express.static('./public'));
app.use(logger);
app.use(helmet());

//Any route with this should be handled by the courses module. 
app.use('/api/courses', courses);
app.use("/", home);

console.log(`Application Name: ${config.get("name")}`);
console.log(`Mail Host: ${config.get("mail.host")}`);
//console.log(`Mail Password: ${config.get("mail.app_password")}`);


/*
* Methods:
* app.get();
* app.post();
* app.put();
* app.delete();
*/

//Port
/*
* Set the environment variable on the machine
* (MAC export PORT=[number])
* (WINDOWS set)
*/
const port = process.env.PORT || 3000

app.listen(port,function() {
    console.log(`Listening on port ${port}`);
});
