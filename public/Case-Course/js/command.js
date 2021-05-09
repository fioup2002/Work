function CreateJSONObject(e, s) {
  var t = new Object();
  return (
    e == CMD_LOGIN
      ? ((t.user_id = s[0]), (t.user_pwd = s[1]))
      : e == CMD_REGISTER
      ? ((t.user_id = s[0]), (t.user_pwd = s[1]), (t.email = s[2]), (t.name = s[3]), (t.phone = s[4]))
      : e == CMD_FORGET
      ? ((t.email = s[0]), (t.user_id = s[1]))
      : e == CMD_MODIFY
      ? (0 != s[0].length && (t.prev_pwd = s[0]), 0 != s[1].length && (t.pwd = s[1]), (t.name = s[2]), 0 != s[3].length && (t.email = s[3]), (t.phone = s[4]))
      : e == CMD_GET_CLASS
      ? null != s && 0 != s.length && (t.token = s[0])
      : e == CMD_GET_CLASS_CONTENT
      ? null != s && 0 != s.length && (t.id = s[0])
      : e == CMD_BUY_CLASS
      ? null != s && 0 != s.length && (t.order_course = s)
      : e == CMD_GET_ORDER
      ? null != s && 0 != s.length && (t.pay_status = s[0])
      : e == CMD_REPORT_ORDER
      ? null != s &&
        0 != s.length &&
        ((t.ref_id = s[0]),
        (t.pay_info = new Object()),
        (t.pay_info.bank_code = s[1]),
        (t.pay_info.acc_code = s[2]),
        (t.pay_info.pay_time = s[3]),
        (t.pay_info.pay_amount = s[4]),
        (t.pay_info.note = s[5]))
      : e == CMD_AUTH_CODE
      ? null != s && 0 != s.length && (t.auth_key = s[0])
      : e == CMD_RE_SEND_EMAIL
      ? (t.email = s[0])
      : e == CMD_SEND_EMAIL_CODE && (t.code = s[0]),
    JSON.stringify(t)
  );
}
function SendCommand(e, s) {
  var t = "",
    r = gToken,
    a = "POST",
    n = "";
  if (e == CMD_GET_ACTIVITY) {
    SendAJAX(CMD_GET_ACTIVITY, "", "/api/event/index.php/event/list", r, "GET", n);
    return;
  } else if (e == CMD_GET_ACtiVITY_DETAIL) {
    SendAJAX(CMD_GET_ACtiVITY_DETAIL, s, "/api/event/index.php/event/" + s + "/content/", r, "GET", n);
    return;
  }
  e == CMD_GET_CLASS
    ? ((t = server + course_api + indexphp + "/course/user/list"), (a = "GET"), (s = ""))
    : e == CMD_LOGIN
    ? (t = server + user_api + indexphp + "/user/login")
    : e == CMD_REGISTER
    ? ((t = server + user_api + indexphp + "/user/account/create"), console.log(s))
    : e == CMD_FORGET
    ? ((t = server + user_api + indexphp + "/user/account/reset"), (a = "GET"), (n = "json="))
    : e == CMD_CHECK_TOKEN
    ? ((t = server + user_api + indexphp + "/user/login/verify"), (a = "GET"), (s = ""))
    : e == CMD_GET_USER_INFO
    ? ((t = server + user_api + indexphp + "/user/account/fetch/info"), (a = "GET"), (s = ""))
    : e == CMD_MODIFY
    ? (t = server + user_api + indexphp + "/user/account/update")
    : e == CMD_GET_CLASS_CONTENT
    ? ((t = server + course_api + indexphp + "/course/" + $.parseJSON(s).id + "/content"), (s = ""), (a = "GET"))
    : e == CMD_BUY_CLASS
    ? (t = server + order_api + indexphp + "/order/create")
    : e == CMD_GET_ORDER
    ? ((t = server + order_api + indexphp + "/order/search"), (a = "GET"), (n = "json="))
    : e == CMD_REPORT_ORDER
    ? (t = server + order_api + indexphp + "/order/report")
    : e == CMD_AUTH_CODE
    ? (t = server + user_api + indexphp + "/user/login/2fa")
    : e == CMD_LOGOUT
    ? ((t = server + user_api + indexphp + "/user/logout"), (s = ""), (a = "GET"))
    : e == CMD_RE_SEND_EMAIL
    ? (t = server + user_api + indexphp + "/user/email/send/verify")
    : e == CMD_SEND_EMAIL_CODE && (t = server + user_api + indexphp + "/user/email/verify"),
    SendAJAX(e, s, t, r, a, n);
}
function SendAJAX(s, t, e, r, a, n) {
  $.ajax({
    type: a,
    url: e,
    complete: function (e) {
      ParseReponse(s, t, e);
    },
    dataType: "json",
    data: n + t,
    headers: {
      "Content-Type": "application/json",
      "access-token": r,
    },
  });
}
function ParseReponse(e, s, t) {
  var r = "";
  try {
    r = $.parseJSON(t.responseText);
  } catch (e) {
    r = t.responseText;
  }
  /*test*/
  // r = new Object();
  // r.status = "success";
  // gToken = "Test";
  // r.courseList = new Array();
  // r.courseData = new Array();
  // for(var i = 1 ; i <= 3; i++)
  // {
  // var class_obj =
  // {
  // "id": "c000"+i,
  // "courseType": i,
  // "name": "攝影第"+i+"課",
  // "description": "這是第一堂課影課程",
  // "specs": [
  // {
  // "duration": 86400,
  // "price": 2000
  // }
  // ],
  // "pics": null,
  // "isValid": 1,
  // "isFree":i
  // }
  // r.courseList.push(class_obj);
  // r.courseData.push(class_obj);
  // }
  /*test*/
  if (
    (0 != gToken.length &&
      "success" != r.status &&
      e != CMD_MODIFY &&
      e != CMD_GET_CLASS_CONTENT &&
      e != CMD_REPORT_ORDER &&
      ((gToken = ""),
      "undefined" != typeof Storage && localStorage.setItem("token", gToken),
      console.log(e),
      console.log(s),
      console.log(JSON.stringify(r)),
      alert("登入逾期") || window.location.assign("./index.htm")),
    e == CMD_GET_CLASS)
  ) {
    if ("success" == r.status && null != r.courseList) {
      for (var a = 0; a < r.courseList.length; a++) {
        if (r.courseList[a].courseType == 2) {
          AddRealClass(r.courseList[a]);
        } else if (r.courseList[a].courseType == 1) {
          if (r.courseList[a].isValid == 1) {
            AddBoughtClass(r.courseList[a]);
          } else {
            AddUnboughtClass(r.courseList[a]);
          }
        } else if (r.courseList[a].courseType == 3) {
          AddFreeCourse(r.courseList[a]);
        }
      }
      if (gCurrentPage == PAGE_INDEX) {
        AddFreeCourseToBought();
        UpdateClass();
      }
    }
  } else if (e == CMD_GET_ACTIVITY) {
    if (r.status == "success") {
      gActivitys = r.eventList;
      $($(".pragrah_title")[0]).after(GenerateActivity());
    }
  } else if (e == CMD_GET_ACtiVITY_DETAIL) {
    if (r.status == "success") {
      var index = 0;
      for (var i = 0; i < gActivitys.length; i++) {
        if (gActivitys[i].event_id == s) {
          gActivitys[i].content = r.eventData;
          index = i;
        }
      }
      $("#act_detail_" + index)
        .append(GenerateActivityDetail(index))
        .show();
    }
  } else if (e == CMD_LOGIN)
    "success" == r.status
      ? (SetDefaultAlerMenu(), $(".alert_menu").append(GenerateAuthMenu()))
      : 1 == r.code
      ? $("#login_error_text").html("登入失敗: 帳號/密碼錯誤")
      : 2 == r.code
      ? $("#login_error_text").html("登入失敗: 不存在的帳號")
      : 3 == r.code
      ? $("#login_error_text").html("登入失敗: 帳號已在別的裝置上登入")
      : 4 == r.code && $("#login_error_text").html("登入失敗: email 寄送異常");
  else if (e == CMD_REGISTER)
    if ("success" == r.status) {
      var n = new Array();
      n.push($.parseJSON(s).user_id), n.push($.parseJSON(s).user_pwd), SendCommand(CMD_LOGIN, CreateJSONObject(CMD_LOGIN, n)), HideAlertMenu();
    } else $("#register_error_text").html("註冊失敗");
  else
    e == CMD_FORGET
      ? "success" == r.status
        ? $("#froget_password_hint").html("請確認信箱是否收到").css("color", "#000")
        : $("#froget_password_hint").html("資料錯誤").css("color", "#F00")
      : e == CMD_CHECK_TOKEN
      ? "success" == r.status
        ? ((gAccount = r.user_id),
          UpdateLoginInformation(),
          gIsCheckToken &&
            (gCurrentPage == PAGE_INDEX && SendCommand(CMD_GET_CLASS, CreateJSONObject(CMD_GET_CLASS, null)), SendCommand(CMD_GET_USER_INFO, CreateJSONObject(CMD_GET_USER_INFO, new Array()))))
        : ((gToken = ""), gIsCheckToken ? gCurrentPage == PAGE_INDEX && SendCommand(CMD_GET_CLASS, CreateJSONObject(CMD_GET_CLASS, null)) : UpdateLoginInformation())
      : e == CMD_GET_USER_INFO
      ? "success" == r.status &&
        ((gName = r.userData.name),
        (gEmail = r.userData.email),
        (gPhone = r.userData.phone),
        $("#user_name").val(gName),
        $("#user_email").val(gEmail),
        $("#user_mobile").val(gPhone),
        null != r.userData.isAdmin && 1 == r.userData.isAdmin ? ((gAdmin = !0), $("#admin_page").css("visibility", "visible")) : ((gAdmin = !1), $("#admin_page").css("visibility", "hidden")))
      : e == CMD_MODIFY
      ? "success" == r.status
        ? $("#data_response_status").html("修改成功").css("color", "#000")
        : $("#data_response_status").html("修改失敗").css("color", "#F00")
      : e == CMD_GET_CLASS_CONTENT
      ? "success" == r.status && null != r.courseData && ((gClass_content = r.courseData), UpdateClassContent())
      : e == CMD_BUY_CLASS
      ? "success" == r.status
        ? ($("#buy_error_text").html("購買成功。匯款完成後，請到會員中心做匯款回報").css("color", "#000"),
          $("#buy_button").html("返回首頁"),
          (gIsBuy = !1),
          (gShoppingCarList = new Array()),
          UpdateUnboughtClass())
        : $("#buy_error_text").html("購買失敗").css("color", "#F00")
      : e == CMD_GET_ORDER
      ? "success" == r.status &&
        ((gOrder_List = r.orders),
        (gOrder_List = gOrder_List.sort(function (e, s) {
          return e.createTime > s.createTime ? -1 : 1;
        })),
        (gOrder_Type = $.parseJSON(s).pay_status),
        UpdateOrderList())
      : e == CMD_AUTH_CODE
      ? "success" == r.status && null != r.token && ((gToken = r.token), (gAccount = r.user_id), "undefined" != typeof Storage && localStorage.setItem("token", gToken), window.location.reload(!0))
      : e == CMD_LOGOUT
      ? ((gToken = ""), "undefined" != typeof Storage && localStorage.setItem("token", gToken), window.location.assign("./index.htm"))
      : e == CMD_REPORT_ORDER
      ? "success" == r.status
        ? alert("回報成功") || window.location.reload(!0)
        : alert("回報失敗")
      : e == CMD_RE_SEND_EMAIL
      ? "success" == r.status
        ? alert("email驗證訊息已經寄送至您填寫的信箱中\n請至您的信箱收取驗證碼並且填寫\n(請注意，驗證碼有區分大小寫)")
        : alert("email驗證訊息寄送失敗\n請檢查填寫的email格式是否正確\n或者請洽網站管理員")
      : e == CMD_SEND_EMAIL_CODE &&
        ("success" == r.status
          ? ($("#mail_hint").html("已驗證信箱").css("color", button_ok_color.split(":")[1]), (gIsVerifyMail = !0))
          : $("#mail_hint").html("驗證失敗").css("color", button_cancel_color.split(":")[1]));
}
function AddRealClass(e) {
  for (var s = !1, t = 0; t < gReal_classes.length; t++) gReal_classes[t].id == e.id && (s = !0);
  s || gReal_classes.push(e);
}
function AddBoughtClass(e) {
  for (var s = !1, t = 0; t < gBought_classes.length; t++) gBought_classes[t].id == e.id && (s = !0);
  s || gBought_classes.push(e);
}
function AddUnboughtClass(e) {
  for (var s = !1, t = 0; t < gClasses.length; t++) gClasses[t].id == e.id && (s = !0);
  s || gClasses.push(e);
}
function AddFreeCourse(course) {
  var isFindCourse = false;
  for (var i = 0; i < gFreeCourse.length; i++) {
    if (gFreeCourse[i].id == course.id) {
      isFindCourse = true;
    }
  }
  if (!isFindCourse) {
    gFreeCourse.push(course);
  }
}
function AddFreeCourseToBought() {
  for (var i = 0; i < gFreeCourse.length; i++) {
    gBought_classes.push(gFreeCourse[i]);
  }
}
