const morgan = require('morgan');
const bodyParser = require('body-parser');
const nunjucks = require('nunjucks');
const pg = require('pg')
const express = require('express');
const path = require('path');
const app = express();
const routes = ('./routes')
const models = require('./models/index.js');

// body parsing middleware
app.use(bodyParser.urlencoded({ extended: true })); // for HTML form submits
app.use(bodyParser.json()); // would be for AJAX requests

//templating boilerplate setup
app.engine('html', nunjucks.render); // how to render html templates
app.set('view engine', 'html'); // what file extension do our templates have
var env = nunjucks.configure('views', { noCache: true }); // where to find the views, caching off

app.use(express.static(path.join(__dirname, '/public')));
app.use(morgan('dev'));
app.get('/', function(req,res){
  res.render('index');
});
app.use('/wiki', require('./routes/wiki'));
//app.use('/user', routes.userRouter);

models.User.sync({force: true})
  .then(function () {
    return models.Page.sync({force: true});
  })
  .then(function () {
    app.listen(1337, () => console.log('Listening on port 1337...'))
  })
  .catch(console.error);


  /* 1. Express should be required in all files
     2. "Import" / "use" the route in app.js (app.use('path' subroute)) <--- but also giving us an error at the moment;
     3. put bodyparser and nunjucks at the top
     4. it's MODULES not models
     5. Liner flow with the .sync promises to ensure we don't try to listen until the sync has been completed
     6. to render root, have a standard: app.get('/', function(req,res){res.render('index');});
     7. Direct filepath name isn't necessary for routes i.e. /wiki/add because nunjucks is looking for
        any html file inside `views folder as we defined in app.js (app.engine('html', nunjucks.render));
     8. REST: represntational state transfer
     9. Sequelize HOOKS & getter methods are their own object outside of 'defining database'
     10. Try to handle database stuff outside of router
     11. There are three ways to write hooks. See: http://docs.sequelizejs.com/manual/tutorial/hooks.html
     */
