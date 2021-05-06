var express = require("express");
var router = express.Router();

router.post("/api/event/index.php/event/create", function (req, res, next) {
  var obj = new Object();
  obj.status = "success";
  res.send(obj);
});

router.post("/api/event/index.php/event/:id/update", function (req, res, next) {
  var obj = new Object();
  obj.status = "success";
  res.send(obj);
});

router.post("/api/course/index.php/file/image/upload", function (req, res, next) {
  var obj = new Object();
  obj.status = "success";
  obj.name = "img_name";
  obj.path = "img_path";
  res.send(obj);
});

router.get("/api/event/index.php/event/:id/content/", function (req, res, next) {
  var obj = new Object();
  obj.status = "success";
  var eventData = new Object();
  eventData.name = "event_name";
  eventData.description = "event_description";
  eventData.isActive = "1";
  eventData.startTime = "1617595691";
  eventData.endTime = "1618027691";
  var data = new Object();
  data.link = "http://link";
  data.mainImg = "./123.jpg";
  data.imgs = new Array();
  for (var i = 0; i < 3; i++) {
    data.imgs.push("./" + i + ".jpg");
  }
  eventData.data = data;
  obj["eventData"] = eventData;
  res.send(obj);
});

router.get("/event/list", function (req, res, next) {
  var obj = new Object();
  obj.status = "success";
  obj.eventList = new Array();
  for (var i = 0; i < 10; i++) {
    var event = new Object();
    event["event_id"] = "event_ID_" + i;
    event["name"] = "event_name_" + i;
    obj.eventList.push(event);
  }
  res.send(obj);
});

module.exports = router;
