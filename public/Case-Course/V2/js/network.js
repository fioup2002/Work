function SendCommand(type) {
  var url = "";
  var httpType = "GET";
  var data = "";

  // server = "/api",
  // user_api = "/user",
  // course_api = "/course",
  // order_api = "/order",
  // indexphp = "/index.php",

  if (type == "check_token_valid") {
    url = "/api/user/index.php/user/login/verify";
  } else if (type == "get_all_course") {
    url = "/api/course/index.php/course/user/list";
  } else if(type == "get_all_event"){
    url = "/api/event/index.php/event/list";
  }
  $.ajax({
    type: httpType,
    url: url,
    success: function (res) {
      ParseReponse(res, type, data);
    },
    dataType: "json",
    data: data,
    headers: {
      "Content-Type": "application/json",
      "access-token": global.token,
    },
  });
}
function ParseReponse(res, type, data) {
  if (res.status == "success") {
    if (type == "check_token_valid") {
      user_id
    } else if (type == "get_all_course") {
      if (global.isDebug) {
        res = {
          status: "success",
          courseList: [
            {
              id: "vt000001",
              courseType: "1",
              name: "\u5b8c\u7f8e\u5448\u73fe\u9ed1\u767d\u5f71\u50cf-1",
              description:
                "\u4eba\u6587\u7684\u5f71\u8abf\u63a7\u5236-\u795e\u5947\u7684\u7b46\u5237-\u5168\u5f71\u8abf \u6cb9\u6f64 \u7acb\u4f53\u611f-\u5149\u53ca\u5f71\u7684\u5236\u4f5c-\u7070\u3001\u9ad8\u8abf\u5236\u4f5c-\u98a8\u666f\u4e2d\u8272\u5f69\u7684\u660e\u5ea6\u63a7\u5236 \u5f37\u5316\u5929\u7a7a",
              specs: [{ price: "2500", duration: 31536000 }],
              pics: [{ name: "thumb", path: "/5bf823428b8c3fa0dfb147f1732ce6be.jpg", serialKey: "4920c6e2fd38" }],
              ext_data: { intro_video: "iBTAPoe1WLc " },
              isActive: "1",
              isValid: 0,
            },
          ],
        };
      }
      
    }
  } else {
    console.log(res);
  }
}
