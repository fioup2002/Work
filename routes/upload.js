var express = require("express");
var router = express.Router();
var multer = require('multer');

var storage = multer.diskStorage(
  {
    destination: function (req, file, cb)
    {
      cb(null, './upload');
    },
    filename: function (req, file, cb)
    {
      cb(null, file.fieldname + '-' + Date.now()+"."+file.originalname.split(".")[1]);
    }
  }
  );
var upload = multer(
  {
    storage: storage
  }
  );

router.post('/test', upload.any(), function (req, res, next)
{
  var file = req.files;
  res.send("OK");
}
);
module.exports = router;