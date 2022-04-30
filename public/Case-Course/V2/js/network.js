function SendCommand(type, callback) {
  var url = "";
  var httpType = "GET";
  var data = "";
  var local = "/test";

  // server = "/api",
  // user_api = "/user",
  // course_api = "/course",
  // order_api = "/order",
  // indexphp = "/index.php",
  if (type == "check_token_valid") {
    url = "/api/user/index.php/user/login/verify";
  } else if (type == "get_all_course") {
    url = "/api/course/index.php/course/user/list";
  } else if (type == "get_all_event") {
    url = "/api/event/index.php/event/list";
  }
  if (window.location.hostname == "127.0.0.1") {
    url = local + url;
  }
  $.ajax({
    type: httpType,
    url: url,
    success: function (res) {
      ParseResponse(res, type, data, callback);
    },
    dataType: "json",
    data: data,
    headers: {
      "Content-Type": "application/json",
      "access-token": global.token,
    },
  });
}
function ParseResponse(res, type, data, callback) {
  if (res.status == "success") {
    if (type == "check_token_valid") {
    } else if (type == "get_all_course") {
      console.log(res)
    }
  } else {
    console.log(res);
  }
}
