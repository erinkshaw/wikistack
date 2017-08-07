const express = require('express');
const router = express.Router();
const models = require('../models');
const Page = models.Page;
const User = models.User;


router.post('/', (req,res,next) => {
  let body = req.body
  console.log(body);
  let page = Page.build({
    title: body.pages_title,
    content: body.pages_content,
    status: body.pages_status
  });
  page.save({})
  .then(res.json(page));
});

router.get('/add', function(req, res, next){
  res.render('addpage');
});

router.get('/:urlTitle', function (req, res, next) {

  Page.findOne({
    where: {
      urlTitle: req.params.urlTitle
    }
  })
  .then(function(foundPage){
    res.render('wikipage', {title: foundPage.title, urlTitle: foundPage.urlTitle, content: foundPage.content});
  })
  .catch(next);

});


router.get('/', function(req,res,next){
  res.redirect('/');
});

module.exports = router;

