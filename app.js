const morgan = require('morgan');
const bodyParser = require('body-parser');
const nunjucks = require('nunjucks');
const pg = require('pg')
const express = require('express');
const path = require('path');
const app = express();

const models = require('./models/index.js');

app.use(morgan('dev'));

models.User.sync({force: true})
  .then(function () {
    return models.Page.sync({force: true});
  })
  .then(function () {
    app.listen(1337, () => console.log('Listening on port 1337...'))
  })
  .catch(console.error);


app.use(express.static(path.join(__dirname, '/public')));


// body parsing middleware
app.use(bodyParser.urlencoded({ extended: true })); // for HTML form submits
app.use(bodyParser.json()); // would be for AJAX requests

//templating boilerplate setup
app.engine('html', nunjucks.render); // how to render html templates
app.set('view engine', 'html'); // what file extension do our templates have
var env = nunjucks.configure('views', { noCache: true }); // where to find the views, caching off

