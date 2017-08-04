const morgan = require('morgan');
const bodyParser = require('body-parser');
const nunjucks = require('nunjucks');
const pg = require('pg')
const express = require('express'); 

const app = express(); 

const server = app.listen(1337, () => console.log('Listening on port 1337...'));

app.use(morgan('dev'));

app.use(express.static(path.join(__dirname, '/public'))); 

// body parsing middleware
app.use(bodyParser.urlencoded({ extended: true })); // for HTML form submits
app.use(bodyParser.json()); // would be for AJAX requests

//templating boilerplate setup
app.engine('html', nunjucks.render); // how to render html templates
app.set('view engine', 'html'); // what file extension do our templates have
var env = nunjucks.configure('views', { noCache: true }); // where to find the views, caching off 

