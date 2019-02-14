var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  //res.render('index', { title: 'Express' });
  res.type('application/json');
  if(req.body.id === undefined)
  {
    res.send({
      "msg":"Error"
    });
  }
  else
  res.cookie('rememberme', '1', { expires: new Date(Date.now() + 900000), httpOnly: true })
  .send({
    id:req.body.id,
    msg:`Welcom mr${req.body.name}`
  });;
});

module.exports = router;
