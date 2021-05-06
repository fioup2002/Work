var gServerAPI = "/api",
  gAllClasses = new Array(),
  gAllModifyClasses = new Array(),
  gRealClasses = new Array(),
  gRealClassType = 2,
  gAllUser = new Array(),
  gOrigianlAllUser = new Array(),
  gClassUser = new Object(),
  gNotInClassUser = new Object(),
  gOrderList = new Array(),
  gModifyClassUser = new Object(),
  gModifyNotInClassUser = new Object(),
  gAlertCount = 0;
var gActivityList = new Array();
var gOrigianlActivityList = new Array();
function GetAllActivity() {
  $.ajax({
    url: "/event/list",
    dataType: "json",
    type: "get",
    data: "",
    success: function (res) {
      gActivityList = res.eventList;
      var obj = new Object();
      obj["event_id"] = -1;
      obj["name"] = "+";
      gActivityList.splice(0, 0, obj);
      gOrigianlActivityList = $.parseJSON(JSON.stringify(res.eventList));
      gOrigianlActivityList.splice(0, 0, obj);
      UpdateActivity();
    },
  });
}
function GetActivityDetail(index) {
  if ($("#activity_detail_" + index).length == 0) {
    if (gActivityList[index].content == undefined) {
      if (index == 0) {
        var date = new Date();
        var eventData = new Object();
        eventData.name = "";
        eventData.description = "";
        eventData.isActive = "1";
        eventData.startTime = Math.floor(date.getTime() / 1000);
        eventData.endTime = Math.floor(date.getTime() / 1000 + 60 * 60 * 24);
        var data = new Object();
        data.link = "";
        data.mainImg = "";
        data.imgs = new Array();
        data.imgs.push("");
        eventData.data = data;
        gActivityList[index].content = eventData;
        gOrigianlActivityList[index].content = $.parseJSON(JSON.stringify(eventData));
        UpdateActivityDetail(index);
      } else {
        $.ajax({
          url: "/api/event/index.php/event/" + gActivityList[index].event_id + "/content/",
          dataType: "json",
          type: "get",
          data: "",
          success: function (res) {
            gActivityList[index].content = res.eventData;
            gOrigianlActivityList[index].content = $.parseJSON(JSON.stringify(res.eventData));
            UpdateActivityDetail(index);
          },
        });
      }
    } else {
      UpdateActivityDetail(index);
    }
  } else {
    if (CheckActicityData(index)) {
      if (confirm("已修改過資料，請問是否儲存?")) {
        gOrigianlActivityList[index].content = $.parseJSON(JSON.stringify(gActivityList[index].content));
        $("#activity_detail_" + index).remove();
      } else {
        gActivityList[index].content = $.parseJSON(JSON.stringify(gOrigianlActivityList[index].content));
        $("#activity_detail_" + index).remove();
      }
    } else {
      gActivityList[index].content = $.parseJSON(JSON.stringify(gOrigianlActivityList[index].content));
      $("#activity_detail_" + index).remove();
    }
  }
}
function SendCreateEvent(index) {
  console.log(gActivityList[index].content);
  $.ajax({
    url: "/api/event/index.php/event/create",
    dataType: "json",
    type: "post",
    data: JSON.stringify(gActivityList[index].content),
    success: function (res) {
      console.log(res);
    },
  });
}
function CheckActicityData(index) {
  var res = false;
  var now = JSON.stringify(gActivityList[index].content);
  var before = JSON.stringify(gOrigianlActivityList[index].content);
  if (now != before) {
    res = true;
  }
  return res;
}
function GetAllRealClass() {
  var a = gServerAPI + "/course/index.php/course/list";
  console.log(a);
  $.ajax({
    type: "GET",
    url: a,
    complete: function (s) {
      var t = "";
      try {
        t = $.parseJSON(s.responseText);
      } catch (e) {
        t = s.responseText;
      }
      CheckStatus(t, a), (gRealClasses = new Array());
      for (var e = 0; e < t.courseList.length; e++) t.courseList[e].courseType == gRealClassType && 1 == t.courseList[e].isActive && gRealClasses.push(t.courseList[e]);
      UpdateRealClass();
    },
    dataType: "json",
    data: "",
    headers: {
      "Content-Type": "application/json",
      "access-token": gToken,
    },
  });
}
function GetAllClass() {
  var e = gServerAPI + "/course/index.php/course/list";
  $.ajax({
    type: "GET",
    url: e,
    complete: function (s) {
      var t = "";
      try {
        t = $.parseJSON(s.responseText);
      } catch (e) {
        t = s.responseText;
      }
      /*test*/
      // t = new Object();
      // t.status = "success";
      // gToken = "Test";
      // t.courseList = new Array();
      // for(var i = 1 ; i <= 3; i++)
      // {
      // var class_obj =
      // {
      // "id": "c000"+i,
      // "courseType": i,
      // "name": "攝影第"+i+"課",
      // "description": "這是第一堂課影課程",
      // "isFree": 1,
      // "specs": [
      // {
      // "duration": 86400,
      // "price": 2000
      // }
      // ],
      // "pics": null,
      // "isValid": 1,
      // "attachFiles":[]
      // }
      // t.courseList.push(class_obj);
      // }
      /*test*/
      CheckStatus(t, e), (0 != (gAllClasses = t.courseList).length && 0 == gAllClasses[0].id.length) || gAllClasses.splice(0, 0, DefaultClass()), (gAllModifyClasses = $.parseJSON(JSON.stringify(gAllClasses))), 1 == gPageIndex && UpdateAllClass();
    },
    dataType: "json",
    data: "",
    headers: {
      "Content-Type": "application/json",
      "access-token": gToken,
    },
  });
}
function GetClassContent(a) {
  var r = gServerAPI + "/course/index.php/course/" + a + "/content";
  $.ajax({
    type: "GET",
    url: r,
    complete: function (s) {
      var t = "";
      try {
        t = $.parseJSON(s.responseText);
      } catch (e) {
        t = s.responseText;
      }
      CheckStatus(t, r);
      for (var e = 0; e < gAllClasses.length; e++) gAllClasses[e].id == a && ((gAllClasses[e].attachFiles = t.courseData.attachFiles), (gAllClasses[e].chapters = t.courseData.chapters), (gAllClasses[e].isFree = t.courseData.isFree));
      (gAllModifyClasses = $.parseJSON(JSON.stringify(gAllClasses))), UpdateAllClassContent(a);
    },
    dataType: "json",
    data: "",
    headers: {
      "Content-Type": "application/json",
      "access-token": gToken,
    },
  });
}
function GetAllMember() {
  var e = gServerAPI + "/user/index.php/user/get/list";
  $.ajax({
    type: "GET",
    url: e,
    complete: function (s) {
      var t = "";
      try {
        t = $.parseJSON(s.responseText);
      } catch (e) {
        t = s.responseText;
      }
      CheckStatus(t, e), (gAllUser = t.userList), (gOrigianlAllUser = t.userList), 4 == gPageIndex && UpdateMemberList();
    },
    dataType: "json",
    data: "",
    headers: {
      "Content-Type": "application/json",
      "access-token": gToken,
    },
  });
}
function GetClassMember(n) {
  var o = gServerAPI + "/user/index.php/user/get/list",
    e = new Object();
  (e.course_id = n),
    $.ajax({
      type: "GET",
      url: o,
      complete: function (s) {
        var t = "";
        try {
          t = $.parseJSON(s.responseText);
        } catch (e) {
          t = s.responseText;
        }
        CheckStatus(t, o), (gClassUser[n] = t.userList), (gNotInClassUser[n] = new Array());
        for (var e = 0; e < gAllUser.length; e++) {
          for (var a = !1, r = 0; r < gClassUser[n].length; r++) gAllUser[e].id == gClassUser[n][r].id && (a = !0);
          a || gNotInClassUser[n].push(gAllUser[e]);
        }
        (gModifyClassUser = $.parseJSON(JSON.stringify(gClassUser))), (gModifyNotInClassUser = $.parseJSON(JSON.stringify(gNotInClassUser))), UpdateUser(n);
      },
      dataType: "json",
      data: "json=" + JSON.stringify(e),
      headers: {
        "Content-Type": "application/json",
        "access-token": gToken,
      },
    });
}
function DisabledClass(e) {
  var a = gServerAPI + "/course/index.php/course/" + e + "/update",
    s = new Object();
  (s.action = "remove"),
    $.ajax({
      type: "POST",
      url: a,
      complete: function (s) {
        var t = "";
        try {
          t = $.parseJSON(s.responseText);
        } catch (e) {
          t = s.responseText;
        }
        CheckStatus(t, a), "success" == t.status && (alert("修改成功") || window.location.reload(!0));
      },
      dataType: "json",
      data: JSON.stringify(s),
      headers: {
        "Content-Type": "application/json",
        "access-token": gToken,
      },
    });
}
function EnabledClass(e) {
  var a = gServerAPI + "/course/index.php/course/" + e + "/update",
    s = new Object();
  (s.action = "activate"),
    $.ajax({
      type: "POST",
      url: a,
      complete: function (s) {
        var t = "";
        try {
          t = $.parseJSON(s.responseText);
        } catch (e) {
          t = s.responseText;
        }
        CheckStatus(t, a), "success" == t.status && (alert("修改成功") || window.location.reload(!0));
      },
      dataType: "json",
      data: JSON.stringify(s),
      headers: {
        "Content-Type": "application/json",
        "access-token": gToken,
      },
    });
}
function SetClass(e, s) {
  console.log(JSON.stringify(s));
  var a = gServerAPI + "/course/index.php/course/" + e + "/update";
  $.ajax({
    type: "POST",
    url: a,
    complete: function (s) {
      var t = "";
      try {
        t = $.parseJSON(s.responseText);
      } catch (e) {
        t = s.responseText;
      }
      CheckStatus(t, a), "success" == t.status && (alert("修改成功") || window.location.reload(!0));
    },
    dataType: "json",
    data: JSON.stringify(s),
    headers: {
      "Content-Type": "application/json",
      "access-token": gToken,
    },
  });
}
function SetNewClass(e) {
  var a = gServerAPI + "/course/index.php/course/create";
  $.ajax({
    type: "POST",
    url: a,
    complete: function (s) {
      var t = "";
      try {
        t = $.parseJSON(s.responseText);
      } catch (e) {
        t = s.responseText;
      }
      CheckStatus(t, a), "success" == t.status && (alert("新增成功") || window.location.reload(!0));
    },
    dataType: "json",
    data: JSON.stringify(e),
    headers: {
      "Content-Type": "application/json",
      "access-token": gToken,
    },
  });
}
function UploadImage(e, s, o, type, subIndex) {
  var c = gServerAPI + "/course/index.php/file/image/upload",
    t = new FormData();
  t.append("img_pos", e),
    t.append("upload_image", s),
    $.ajax({
      type: "POST",
      url: c,
      complete: function (s) {
        var t = "";
        try {
          t = $.parseJSON(s.responseText);
        } catch (e) {
          t = s.responseText;
        }
        if ((CheckStatus(t, c), "success" == t.status)) {
          if (PAGE_MENUS[gPageIndex] == "外拍活動管理") {
            if (type == "activity_detail_subImage_add") {
              gActivityList[o].content.data.imgs.push(t.path);
            } else if (type == "activity_detail_mainImage_change") {
              gActivityList[o].content.data.mainImg = t.path;
            } else if (type == "activity_detail_subImage_change") {
              gActivityList[o].content.data.imgs[subIndex] = t.path;
            }
            UpdateActivityDetail(o);
          } else {
            for (var e = 0; e < gAllModifyClasses.length; e++)
              if (gAllModifyClasses[e].id == o) {
                var a = !1;
                null == gAllModifyClasses[e].pics && (gAllModifyClasses[e].pics = new Array());
                for (var r = 0; r < gAllModifyClasses[e].pics.length; r++) gAllModifyClasses[e].pics[r].name == t.name && ((gAllModifyClasses[e].pics[r].path = t.path), (a = !0));
                if (!a) {
                  var n = new Object();
                  (n.name = t.name), (n.path = t.path), gAllModifyClasses[e].pics.push(n);
                }
              }
            UpdateImage(o);
          }
        } else alert("上傳圖片失敗");
      },
      contentType: !1,
      processData: !1,
      data: t,
      headers: {
        "access-token": gToken,
      },
    });
}
function SetSaveRealClass(e) {
  var s = gServerAPI + "/course/index.php/course/convert";
  console.log(e),
    $.ajax({
      type: "POST",
      url: s,
      complete: function (e) {
        alert("轉換成功"), window.location.reload(!0);
      },
      dataType: "json",
      data: e,
      headers: {
        "Content-Type": "application/json",
        "access-token": gToken,
      },
    });
}
function SetMember(e, s, t) {
  var a = gServerAPI + "/course/index.php/course/user/list/update",
    r = new Object();
  (r.userList = s),
    (r.course_id = e),
    (r.action = t),
    $.ajax({
      type: "POST",
      url: a,
      complete: function (s) {
        var t = "";
        try {
          t = $.parseJSON(s.responseText);
        } catch (e) {
          t = s.responseText;
        }
        CheckStatus(t, a), "success" == t.status && (1 == gAlertCount ? alert("修改成功") || window.location.reload(!0) : gAlertCount--);
      },
      dataType: "json",
      data: JSON.stringify(r),
      headers: {
        "Content-Type": "application/json",
        "access-token": gToken,
      },
    });
}
function GetOrder(e, s) {
  var a = gServerAPI + "/order/index.php/order/search",
    t = new Object();
  "id" == e ? (t.user_id = s) : (t.ref_id = s),
    $.ajax({
      type: "GET",
      url: a,
      complete: function (s) {
        var t = "";
        try {
          t = $.parseJSON(s.responseText);
        } catch (e) {
          t = s.responseText;
        }
        CheckStatus(t, a), (gOrderList = t.orders), UpdateOrderList("filter");
      },
      dataType: "json",
      data: "json=" + JSON.stringify(t),
      headers: {
        "Content-Type": "application/json",
        "access-token": gToken,
      },
    });
}
function GetAllOrder() {
  var e = gServerAPI + "/order/index.php/order/search";
  $.ajax({
    type: "GET",
    url: e,
    complete: function (s) {
      var t = "";
      try {
        t = $.parseJSON(s.responseText);
      } catch (e) {
        t = s.responseText;
      }
      CheckStatus(t, e), (gOrderList = t.orders), UpdateOrderList("all");
    },
    dataType: "json",
    data: "",
    headers: {
      "Content-Type": "application/json",
      "access-token": gToken,
    },
  });
}
function SetSaveOrder(e) {
  var a = gServerAPI + "/order/index.php/order/verify",
    s = new Object();
  (s.ref_id = e),
    $.ajax({
      type: "POST",
      url: a,
      complete: function (s) {
        var t = "";
        try {
          t = $.parseJSON(s.responseText);
        } catch (e) {
          t = s.responseText;
        }
        CheckStatus(t, a), "success" == t.status && (alert("確認成功") || window.location.reload(!0));
      },
      dataType: "json",
      data: JSON.stringify(s),
      headers: {
        "Content-Type": "application/json",
        "access-token": gToken,
      },
    });
}
function SetCloseUser(e) {
  var a = gServerAPI + "/user/index.php/user/update/status",
    s = new Object();
  (s.userID = e),
    (s.action = "disable"),
    $.ajax({
      type: "GET",
      url: a,
      complete: function (s) {
        var t = "";
        try {
          t = $.parseJSON(s.responseText);
        } catch (e) {
          t = s.responseText;
        }
        CheckStatus(t, a), "success" == t.status && (alert("修改成功") || window.location.reload(!0));
      },
      dataType: "json",
      data: "json=" + JSON.stringify(s),
      headers: {
        "Content-Type": "application/json",
        "access-token": gToken,
      },
    });
}
function SetOpenUser(e) {
  var a = gServerAPI + "/user/index.php/user/update/status",
    s = new Object();
  (s.userID = e),
    (s.action = "enable"),
    $.ajax({
      type: "GET",
      url: a,
      complete: function (s) {
        var t = "";
        try {
          t = $.parseJSON(s.responseText);
        } catch (e) {
          t = s.responseText;
        }
        CheckStatus(t, a), "success" == t.status && (alert("修改成功") || window.location.reload(!0));
      },
      dataType: "json",
      data: "json=" + JSON.stringify(s),
      headers: {
        "Content-Type": "application/json",
        "access-token": gToken,
      },
    });
}
function GetUserInfo(e) {
  var a = gServerAPI + "/user/index.php/user/account/fetch/info",
    s = new Object();
  (s.user_id = e),
    $.ajax({
      type: "GET",
      url: a,
      complete: function (s) {
        var t = "";
        try {
          t = $.parseJSON(s.responseText);
        } catch (e) {
          t = s.responseText;
        }
        CheckStatus(t, a), UpdateUserInfo(t, e);
      },
      dataType: "json",
      data: "json=" + JSON.stringify(s),
      headers: {
        "Content-Type": "application/json",
        "access-token": gToken,
      },
    });
}
function CheckStatus(e, s) {
  // "success" != e.status && (console.log(JSON.stringify(e)), console.log(s), alert("登入逾期") || window.location.assign("../index.htm"))
}
function DeleteImage(e) {
  var s = gServerAPI + "/course/index.php/file/image/remove",
    t = new FormData();
  t.append("img_name", e),
    $.ajax({
      type: "POST",
      url: s,
      complete: function (s) {
        var t = "";
        try {
          t = $.parseJSON(s.responseText);
        } catch (e) {
          t = s.responseText;
        }
        "success" != t.status && alert("刪除圖片失敗");
      },
      contentType: !1,
      processData: !1,
      data: t,
      headers: {
        "access-token": gToken,
      },
    });
}
