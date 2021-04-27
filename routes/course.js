var express = require("express");
var router = express.Router();
router.post("/event/list", function (req, res, next) {
  var obj = new Object();
  obj.status = "success";
  obj.eventList = new Array();
  for(var i = 0 ; i < 10; i++){
    var event = new Object();
    event["event_id"] = "event_ID_" + i;
    event["name"] = "event_name_" + i;
    obj.eventList.push(event);
  }
  res.send(obj);
});
module.exports = router;
