var express = require("express");
var router = express.Router();

var request = require("request");
router.get(/debug/, function (req, res, next) {
  var obj = new Object();
  obj.status = "success";
  res.send(obj);
  // var newurl = 'https://www.teacher-ju.net/';
  // request(newurl).pipe(res);
});

router.get("/api/user/index.php/user/get/list", function (req, res, next) {
  var obj = new Object();
  obj.status = "success";
  obj.userList = [];
  for (var i = 0; i < 5; i++) {
    var user = new Object();
    user.id = "id_" + i;
    user.name = "name_" + i;
    obj.userList.push(user);
  }
  res.send(obj);
});

router.get("/api/order/index.php/order/search", function (req, res, next) {
  var obj = new Object();
  obj.status = "success";
  obj.orders = [];
  for (var i = 0; i < 5; i++) {
    var order = new Object();
    order.ref = "ref_" + i;
    order.createTime = "createTime_" + i;
    order.status = Math.floor(Math.random() * 4 + 1);
    order.customer = "customer_" + i;
    order.amount = "amount_" + i;
    order.buyList = [];
    var reportInfo = new Object();
    reportInfo.bankCode = "bankCode_" + i;
    reportInfo.accCode = "accCode_" + i;
    reportInfo.payTime = "payTime_" + i;
    reportInfo.payAmount = "payAmount_" + i;
    reportInfo.note = "note_" + i;
    order.reportInfo = reportInfo;
    obj.orders.push(order);
  }
  res.send(obj);
});

router.get("/api/course/index.php/course/list", function (req, res, next) {
  var obj = new Object();
  obj.status = "success";
  gToken = "Test";
  obj.courseList = new Array();
  for (var i = 1; i <= 3; i++) {
    var class_obj = {
      id: "c000" + i,
      courseType: Math.floor(Math.random() * 2 + 1),
      name: "攝影第" + i + "課",
      description: "這是第一堂課影課程",
      isFree: 1,
      specs: [
        {
          duration: 86400,
          price: 2000,
        },
      ],
      pics: null,
      isValid: 1,
      attachFiles: [],
      isActive: 1,
    };
    obj.courseList.push(class_obj);
  }

  res.send(obj);
});

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
  eventData.description = "123456\n4897\n789\n123";
  eventData.isActive = "1";
  eventData.startTime = "1617595691";
  eventData.endTime = "1618027691";
  var data = new Object();
  data.link = "http://link";
  data.mainImg = "./123.jpg";
  data.imgs = new Array();
  for (var i = 0; i < 8; i++) {
    data.imgs.push("./" + i + ".jpg");
  }
  eventData.data = data;
  obj["eventData"] = eventData;
  res.send(obj);
});

router.get("/api/event/index.php/event/list", function (req, res, next) {
  var obj = new Object();
  obj.status = "success";
  obj.eventList = new Array();
  for (var i = 0; i < 10; i++) {
    var event = new Object();
    event["event_id"] = "event_ID_" + i;
    event["name"] = "event_name_" + i;
    event["is_active"] = 1;
    event["main_img"] = "img_" + i;
    obj.eventList.push(event);
  }
  res.send(obj);
});

module.exports = router;
