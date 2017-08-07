const express = require('express');
const router = express.Router();

router.get('/', function(req,res,next){
  res.redirect('/');
}); 

router.post('/', (req,res,next) => {
  res.json(req.body);
  //CONFIRM: `for` attribution can include `.` 
}); 

router.get('/add', function(req,res,next){
  res.render('addpage');
}); 

module.exports = router; 

