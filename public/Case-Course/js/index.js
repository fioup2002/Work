function InitialScreen() {
  if (
    (navigator.userAgent.search("Safari") <= -1 && alert("本站建議使用Google Chrome瀏覽器以獲得最佳使用體驗"), (gCurrentPage = PAGE_INDEX), 0 != localStorage.length && 0 != localStorage.token.length)
  ) {
    gToken = localStorage.token;
    var e = new Array();
    e.push(gToken), (gIsCheckToken = !0), SendCommand(CMD_CHECK_TOKEN, CreateJSONObject(CMD_CHECK_TOKEN, e));
  } else SendCommand(CMD_GET_CLASS, CreateJSONObject(CMD_GET_CLASS, null));
  SendCommand(CMD_GET_ACTIVITY, CreateJSONObject(CMD_GET_ACTIVITY, null));
  $("body").append(GenerateBody()),
    $("body").append(GenerateAlertMenu()),
    $(".alert_menu").on("click", function (e) {
      e.target == e.currentTarget && HideAlertMenu();
    }),
    UpdateLoginInformation();
}
function GenerateBody() {
  var e = "";
  return (
    (e += "<div class='body'>"),
    (e += GenerateBorder("background:rgba(150,150,255,1)")),
    (e += GenerateHeader(PAGE_INDEX)),
    (e += GenerateInformation()),
    (e += GenerateParagraphTitle("外拍活動")),
    (e += GenerateParagraphTitle("課堂錄影")),
    (e += GenerateRealClass()),
    (e += GenerateParagraphTitle("線上課程")),
    (e += GenerateBoughtClass()),
    (e += GenerateParagraphTitle("購買課程")),
    (e += GenerateClass()),
    (e += GenerateParagraphTitle("常見問題")),
    (e += GenerateNormalQuestion()),
    (e += GenerateParagraphTitle("聯絡資訊")),
    (e += GenerateContact()),
    (e += "<div class='pragrah_title'>"),
    (e += GenerateTitleString("Copyright 2019 © 朱智青老師影像 All Rights Reserved", "font-size:16px;color:#A5A5A5;text-align:center")),
    (e += "</div>"),
    (e += "</div>"),
    (e += GenerateLargeImageBlock())
  );
}
function GenerateParagraphTitle(e) {
  var t = "";
  return (t += "<div class='pragrah_title'>"), (t += GenerateTitleString(e, "font-size: 30px;font-weight:bold;letter-spacing:5;text-align:center")), (t += "</div>");
}
function GenerateInformation() {
  return (
    "<div class='main_information'>",
    "<div class='main_information_block_background'>",
    "</div>",
    "<div class='main_information_block'>",
    "<div class='main_information_block_content_big'>",
    "<span style='font-size:60px;font-weight:bold;color:rgba(255,255,255,1);letter-spacing:5'>平面中的風景與情懷</span>",
    "<br>",
    "<span style='font-size:25px;color:rgba(255,255,255,1);letter-spacing:5'>朱智青帶你攝影、編修與旅拍</span>",
    "</div>",
    "</div>",
    "</div>",
    "<div class='main_information'><div class='main_information_block_background'></div><div class='main_information_block'><div class='main_information_block_content_big'><span style='font-size:60px;font-weight:bold;color:rgba(255,255,255,1);letter-spacing:5'>平面中的風景與情懷</span><br><span style='font-size:25px;color:rgba(255,255,255,1);letter-spacing:5'>朱智青帶你攝影、編修與旅拍</span></div></div></div>"
  );
}
function GenerateActivity() {
  var result = "";
  result += "<div class='act'>";
  result += "<div class='act_content'>";
  var isNeedShowText = true;
  for (var i = 0; i < gActivitys.length; i++) {
    var obj = gActivitys[i];
    if (obj.is_active == 1) {
      result += "<div class='act_content_block'>";
      result += "<img class='act_content_block_img' style='background: url(" + obj.main_img + ") no-repeat center; background-size: contain;'>";
      result += "</img>";
      result += "<div class='act_content_block_title'>";
      result += GenerateNormalString(obj.name, "", "");
      result += "</div>";
      result += "<div id='id='act_btn_" + i + "'' class='act_content_block_btn' onclick='SendCommand(\"" + CMD_GET_ACTIVITY_DETAIL + '", "' + obj.event_id + "\")'>";
      result += GenerateNormalString("查看詳情", "text-align: center", "");
      result += "</div>";
      result += "</div>";
      result += "<div class='act_content_detail' id='act_detail_" + i + "'>";
      result += "</div>";
      isNeedShowText = false;
    }
  }
  if (isNeedShowText) {
    result += "<div class='act_content_no'>";
    result += GenerateTitleString("目前並無新活動", "font-size: 20px;text-align:center;");
    result += "</div>";
  }
  result += "</div>";
  result += "</div>";
  return result;
}
function GenerateLargeImageBlock() {
  var res = "";
  res += "<div class='largeImage' onclick='CloseLargeImage()'>";
  res += "<div class='largeImage_background' >";
  res += "</div>";
  res += "<img class='largeImage_content'>";
  res += "</img>";
  res += "</div>";
  return res;
}
function GenerateActivityDetail(index) {
  var result = "";
  result += "<div class='act_content_detail_title'>";
  result += "<div class='act_content_detail_title_left'>";
  result += GenerateNormalString(gActivitys[index].name, "text-align: center; font-size: x-large; font-weight: bold", "");
  result += "</div>";
  result += "<div class='act_content_detail_title_right' onclick='CloseActivityDetail(\"" + index + "\")'>";
  result += GenerateNormalString("X", "text-align: center; font-size: x-large; font-weight: bold", "");
  result += "</div>";
  result += "</div>";
  result += "<img class='act_content_detail_img' style='background: url(" + gActivitys[index].main_img + ") no-repeat center; background-size: contain;' >";
  result += "</img>";
  result += "<div class='act_content_detail_imgs'>";
  console.log(gActivitys[index].content);
  for (var j = 0; j < gActivitys[index].content.data.imgs.length; j++) {
    var img = gActivitys[index].content.data.imgs[j];
    result += "<img class='act_content_detail_imgs_icon' style='background: url(" + img + ") no-repeat center; background-size:100% 100%' onclick='ShowLargeImage(" + index + " ," + j + ")'>";
    result += "</img>";
  }
  result += "</div>";
  result += "<div class='act_content_detail_text'>";
  result += GenerateNormalString(gActivitys[index].content.description, "", "");
  result += "</div>";
  result += "<a class='act_content_detail_btn' href='" + gActivitys[index].content.data.link + "' target='_blank'>";
  result += GenerateNormalString("我要報名", "text-align: center;", "");
  result += "</a>";

  return result;
}
function UpdateClass() {
  for (var e = "", t = 0; t < gReal_classes.length; t++) e += GenerateClassBlock(t, gReal_classes[t]);
  0 == e.length && (e += GenerateNormalString("您目前沒有參與的線下課程", "text-align:center")), $(".main_real_class").empty().append(e), (e = "");
  for (t = 0; t < gBought_classes.length; t++) e += GenerateClassBlock(t, gBought_classes[t]);
  0 == e.length && (e += GenerateNormalString("您目前沒有可以觀看的線上課程", "text-align:center")), $(".main_bought_class").empty().append(e), (e = "");
  for (t = 0; t < gClasses.length; t++) e += GenerateClassBlock(t, gClasses[t]);
  0 == e.length && (e += GenerateNormalString("您目前沒有可以購買的線上課程", "text-align:center")), $(".main_class").empty().append(e);
  var n = 0;
  (n = 0 == gReal_classes.length ? 40 : 393 * Math.ceil(gReal_classes.length / 3) + 3),
    $(".main_real_class").css("height", n),
    (n = (n = 0) == gBought_classes.length ? 40 : 393 * Math.ceil(gBought_classes.length / 3) + 3),
    $(".main_bought_class").css("height", n),
    (n = (n = 0) == gClasses.length ? 40 : 393 * Math.ceil(gClasses.length / 3) + 3),
    $(".main_class").css("height", n);
}
function GenerateRealClass() {
  return "<div class='main_real_class'>", "</div>", "<div class='main_real_class'></div>";
}
function GenerateBoughtClass() {
  return "<div class='main_bought_class'>", "</div>", "<div class='main_bought_class'></div>";
}
function GenerateClass() {
  return "<div class='main_class'>", "</div>", "<div class='main_class'></div>";
}
function GenerateClassBlock(e, t) {
  var n = "BuyClass(" + e + ")",
    a = "加入購物車",
    i = button_cancel_color,
    l = "class_status_" + e;
  (1 != t.isValid && 2 != t.courseType) || ((n = "ShowVideoList(" + e + "," + t.courseType + ")"), (a = "觀看課程"), (i = button_ok_color), (l = ""));
  var s = "";
  if (
    ((s += "<div class='main_class_block'>"),
    (s += GeneratePic(t)),
    (s += "<div class='main_class_block_line'>"),
    (s += GenerateNormalString(t.name, "text-align:center;font-size:20px;")),
    (s += "</div>"),
    1 == t.isValid && 2 != t.courseType
      ? (s += "<div class='main_class_block_info' style='height:calc(30px * 3);'>")
      : 2 == t.courseType
      ? (s += "<div class='main_class_block_info' style='height:calc(30px * 4);'>")
      : (s += "<div class='main_class_block_info' >"),
    (s += GenerateNormalString(t.description, "text-align:center")),
    (s += "</div>"),
    1 == t.courseType &&
      0 == t.isValid &&
      (null == t.ext_data && (t.ext_data = new Object()),
      null == t.ext_data.intro_video && (t.ext_data.intro_video = ""),
      (s += "<div class='main_class_block_line' onclick='ChangeToVideoPage(\"" + t.ext_data.intro_video + "\")'>"),
      (s += GenerateNormalString("介紹影片", "text-align:center;color:#00F")),
      (s += "</div>")),
    2 != t.courseType && 2 != t.isActive && t.isFree != 1)
  ) {
    if (((s += "<div class='main_class_block_line'>"), (s += "<div class='main_class_block_line_key'>"), (s += GenerateNormalString("期間", "text-align:center")), (s += "</div>"), 1 == t.isValid))
      (s += "<div class='main_class_block_line_value'>"), (s += GenerateNormalString(GetValidTime(t.expireTime, !1), "text-align:center")), (s += "</div>");
    else {
      s += "<select id='duration_" + e + "' class='main_class_block_line_value' onchange='ChangePrice(" + e + ")' style='text-align-last:center;'>";
      for (var r = 0; r < t.specs.length; r++) {
        var o = GetValidTime(t.specs[r].duration, !0);
        s += "<option value='" + t.specs[r].duration + "'>" + o + "</option>";
      }
      s += "</select>";
    }
    s += "</div>";
  }
  return (
    2 == t.isActive && ((s += "<div class='main_class_block_line'>"), (s += GenerateNormalString("課程建構中，敬請期待", "text-align:center")), (s += "</div>")),
    0 == t.isValid &&
      2 != t.courseType &&
      2 != t.isActive &&
      ((s += "<div class='main_class_block_line'>"),
      (s += "<div class='main_class_block_line_key'>"),
      (s += GenerateNormalString("價格", "text-align:center")),
      (s += "</div>"),
      (s += "<div class='main_class_block_line_value'>"),
      (s += GenerateNormalString(t.specs[0].price, "text-align:left", "price_" + e)),
      (s += "</div>"),
      (s += "</div>")),
    2 != t.isActive && ((s += "<div class='main_class_block_line' onclick='" + n + "'>"), (s += GenerateNormalString(a, "text-align:center;" + i, l)), (s += "</div>")),
    (s += "</div>")
  );
}
function GeneratePic(course) {
  var result = "";
  result += "<div class='main_class_block_img' style='position:relative'>";
  result += GetThumbPic(course);
  if (course.isFree == 1) {
    result += "<div class='main_class_block_img' style='margin-left:0px;margin-top:0px;width:100px;height:60px;min-width:50px;background:#F00;position:absolute'>";
    result += GenerateNormalString("免費", "text-align:center;color:#FF0");
    result += "</div>";
  }
  result += "</div>";
  return result;
}
function GetThumbPic(e) {
  var t = "";
  if (null != e.pics)
    for (var n = 0; n < e.pics.length; n++) {
      var a = e.pics[n];
      "thumb" == a.name && (t = "<img class='fill_parent' src='" + a.path + "' style='position:absolute'></img>");
    }
  return t;
}
function GenerateNormalQuestion() {
  var e = "";
  e += "<div class='main_normal_question'>";
  for (var t = 0; t < normal_questions.length; t++) e += GenerateNormalQuestionBlock(t);
  return (e += "</div>");
}
function GenerateNormalQuestionBlock(e) {
  var t = "";
  return (
    (t += "<div class='main_normal_question_block'>"),
    (t += "<div class='main_normal_question_block_title'>"),
    (t += GenerateTitleString(normal_questions[e].title, "font-size: 20px;font-weight:bold;letter-spacing:5;")),
    (t += "</div>"),
    (t += "<div class='main_normal_question_block_plus' onclick='ShowNormalQuestionContent(\"" + e + "\");'>"),
    (t += GenerateNormalString("+", "text-align:center;" + button_ok_color)),
    (t += "</div>"),
    (t += "</div>"),
    "如何知道我的環境可以觀看站上的課程影片?" == normal_questions[e].title ? (t += GenerateNoramalQuestionBlockVideoContent(e)) : (t += GenerateNoramalQuestionBlockContent(e)),
    t
  );
}
function GenerateNoramalQuestionBlockContent(e) {
  var t = "";
  return (
    (t += "<div id='normal_question_content_" + e + "' class='main_normal_question_block_content' style='height:" + 30 * normal_questions[e].answer.split("<br>").length + "px'>"),
    (t += "<div id='normal_question_content_" + e + "' class='main_normal_question_block_content_block'>"),
    (t += GenerateNormalString(normal_questions[e].answer, "font-size: 16px;font-weight:bold;letter-spacing:5;")),
    (t += "</div>"),
    (t += "</div>")
  );
}
function GenerateNoramalQuestionBlockVideoContent(e) {
  var t = "";
  return (
    (t += "<div id='normal_question_content_" + e + "' class='main_normal_question_block_content' style='height:400px'>"),
    (t += "<div id='normal_question_content_" + e + "' class='main_normal_question_block_content_block'>"),
    (t += "<div class='main_normal_question_block_content_block_message'>"),
    (t += GenerateNormalString(normal_questions[e].answer, "font-size: 16px;font-weight:bold;letter-spacing:5;")),
    (t += "</div>"),
    (t += "<div class='main_normal_question_block_content_block_video'>"),
    (t +=
      "<iframe src='" +
      gTestVideoUrl +
      "' class='fill_parent' allowfullscreen='allowfullscreen' mozallowfullscreen='mozallowfullscreen' msallowfullscreen='msallowfullscreen' oallowfullscreen='oallowfullscreen' webkitallowfullscreen='webkitallowfullscreen'>"),
    (t += "</iframe >"),
    (t += "</div>"),
    (t += "</div>"),
    (t += "</div>")
  );
}
function GenerateContact() {
  var e = "";
  return (e += "<div class='main_contact'>"), (e += "<div class='main_contact_content'>"), (e += GenerateNormalString("寫信: w5011aa@gmail.com")), (e += "</div>"), (e += "</div>");
}
function UpdateClassContent() {
  // gClass_content = {
  // "id": "c0001",
  // "courseType": 3,
  // "name": "攝影第3課",
  // "description": "這是第一堂課影課程",
  // "specs": [
  // {
  // "duration": 86400,
  // "price": 2000
  // }
  // ],
  // "pics": null,
  // "isValid": 1,
  // "isFree":1,
  // "chapters": [
  // {
  // "chapNo": "ch1",
  // "description": "2222",
  // "link": "https://player.vimeo.com/video/20394792",
  // "startTime": 1588608000,
  // "expireTime": 1588694340,
  // "attachFile_map": [
  // "123"
  // ]
  // },
  // {
  // "chapNo": "ch2",
  // "description": "2222",
  // "link": "https://player.vimeo.com/video/4537",
  // "startTime": 1588608000,
  // "expireTime": 1588694340,
  // "attachFile_map": [
  // "234"
  // ]
  // }
  // ],
  // "attachFiles": []
  // }
  $("#video_class_title").html(gClass_content.name);
  for (var e = "", t = 0; t < gClass_content.chapters.length; t++) e += GenerateVideoBlockList(gClass_content.chapters[t], t, gClass_content);
  (e += GenerateEmptyBorder()), $(".alert_content_video").empty().append(e), $(".alert_content_attatch").empty().append(GenerateAttachList(gClass_content.attachFiles));
  if (gClass_content.isFree == 1) {
    for (var i = 0; i < gClass_content.chapters.length; i++) {
      for (var j = 0; j <= 3; j++) {
        $("#" + gClass_content.chapters[i].chapNo + "_" + gClass_content.name + "_" + j).html("");
      }
    }
  }
}
function GenerateVideoList() {
  var e = "";
  return (
    (e += "<div class='alert_content'>"),
    (e += "<div class='alert_content_title'>"),
    (e += GenerateTitleString("", "text-align:center", "video_class_title")),
    (e += "</div>"),
    (e += "<div class='alert_content_video'>"),
    (e += "</div>"),
    (e += "<div class='alert_content_attatch'>"),
    (e += "</div>"),
    (e += "</div>")
  );
}
function GenerateVideoBlockList(e, t, n) {
  var a = "";
  return (
    (a += "<div class='alert_content_video_list'>"),
    (a += "<div class='alert_content_video_list_title'>"),
    (a += GenerateTitleString(e.chapNo)),
    (a += "</div>"),
    null == n.expireTime
      ? 1 == e.disableFlag
        ? ((a += "<div class='alert_content_video_list_duration_title' style='width:calc((90% - 40px) * 0.70);'>"),
          (a += GenerateTitleString("可觀看本堂課程錄影時間尚未開始", "text-align:right;", e.chapNo + "_" + n.name + "_0")))
        : 2 == e.disableFlag
        ? ((a += "<div class='alert_content_video_list_duration_title' style='width:calc((90% - 40px) * 0.70);'>"),
          (a += GenerateTitleString("可觀看本堂課程錄影時間已過", "text-align:right;", e.chapNo + "_" + n.name + "_1")))
        : ((a += "<div class='alert_content_video_list_duration_title'>"),
          (a += GenerateTitleString("觀看到期時間:", "text-align:right;", e.chapNo + "_" + n.name + "_2")),
          (a += "</div>"),
          (a += "<div class='alert_content_video_list_duration'>"),
          (a += GenerateTitleString(GetValidTime(e.expireTime, !1), "", e.chapNo + "_" + n.name + "_3")))
      : ((a += "<div class='alert_content_video_list_duration_title'>"), (a += "</div>"), (a += "<div class='alert_content_video_list_duration'>")),
    (a += "</div>"),
    (a += "<div class='alert_content_video_list_plus' onclick='ShowVideo(\"" + e.chapNo + '",' + t + ")'>"),
    (a += GenerateNormalString("+", "text-align:center;" + button_ok_color)),
    (a += "</div>"),
    (a += "</div>"),
    (a += GenerateVideoBlockListContent(e.chapNo, e.link))
  );
}
function GenerateVideoBlockListContent(e, t) {
  var n = "";
  return (
    (n += "<div id='video_list_content_" + e + "' class='alert_content_video_play'>"),
    (n +=
      "<iframe id='video_list_content_src_" +
      e +
      "' src='" +
      t +
      "' class='fill_parent' allowfullscreen='allowfullscreen' mozallowfullscreen='mozallowfullscreen' msallowfullscreen='msallowfullscreen' oallowfullscreen='oallowfullscreen' webkitallowfullscreen='webkitallowfullscreen'>"),
    (n += "</iframe >"),
    (n += "</div>")
  );
}
function GenerateAttachList(e) {
  var t = "";
  (t += "<div class='alert_content_attatch_list'>"),
    (t += "<div class='alert_content_attatch_list_title'>"),
    (t += GenerateTitleString("附件")),
    (t += "</div>"),
    (t += "<div class='alert_content_attatch_list_title_plus' onclick='ShowAttach()'>"),
    (t += GenerateNormalString("+", "text-align:center;" + button_ok_color)),
    (t += "</div>"),
    (t += "</div>"),
    (t += "<div id='attach_list'class='alert_content_attatch_info'>");
  for (var n = 0; n < gClass_content.attachFiles.length; n++) t += GenerateChapterAttach(gClass_content.attachFiles[n]);
  return (t += "</div>");
}
function GenerateChapterAttach(e) {
  var t = "";
  return (
    (t += "<div class='alert_content_attatch_info_block'>"),
    (t += "<div class='alert_content_attatch_info_block_title'>"),
    (t += GenerateNormalString(e.name, "text-align:left;")),
    (t += "</div>"),
    (t += "<a class='alert_content_attatch_info_block_link' href=" + e.path + " target='_blank'>"),
    (t += GenerateNormalString("點此下載", "text-align:center;color:#00F")),
    (t += "</a>"),
    (t += "</div>")
  );
}
function GenerateShoppingCar() {
  var e = "";
  if (((e += "<div class='alert_menu_block'>"), (e += "<div class='alert_menu_block_boder_block_center_block'>"), 0 == gShoppingCarList.length))
    (e += "<div class='alert_menu_block_boder_block_center_block_line'>"),
      (e += "<div class='alert_menu_block_boder_block_center_block_button' style='margin-left:35%;border:0'>"),
      (e += GenerateTitleString("無選購課程", "text-align:center;" + button_cancel_color)),
      (e += "</div>"),
      (e += "</div>");
  else {
    for (var t = 0; t < gShoppingCarList.length; t++) (e += "<div class='alert_menu_block_boder_block_center_block_line'>"), (e += GenerateShoppingCarItem(gShoppingCarList[t])), (e += "</div>");
    (e += "<div class='alert_menu_block_boder_block_center_block_line'>"),
      (e += GenerateNormalString("", "color:#F00;text-align:center", "buy_error_text")),
      (e += "</div>"),
      (e += "<div class='alert_menu_block_boder_block_center_block_line'>"),
      (e += "<div class='alert_menu_block_boder_block_center_block_button' style='margin-left:35%' onclick='ConfirmShoppingCar()'>"),
      (e += GenerateTitleString("購買", "text-align:center;" + button_ok_color, "buy_button")),
      (e += "</div>"),
      (e += "</div>");
  }
  return (e += "</div>"), (e += "</div>");
}
function GenerateShoppingCarItem(e) {
  var t = "";
  return (
    (t += "<div class='alert_menu_shopping_car_list'>"),
    (t += "<div class='alert_menu_shopping_car_list_title'>"),
    (t += GenerateNormalString("課程名稱:", "text-align:center;")),
    (t += "</div>"),
    (t += "<div class='alert_menu_shopping_car_list_title'>"),
    (t += GenerateNormalString(gClasses[e.index].name)),
    (t += "</div>"),
    (t += "<div class='alert_menu_shopping_car_list_title'>"),
    (t += GenerateNormalString("可觀看期間:", "text-align:center;")),
    (t += "</div>"),
    (t += "<div class='alert_menu_shopping_car_list_title'>"),
    (t += GenerateNormalString(GetValidTime(e.duration, !0))),
    (t += "</div>"),
    (t += "<div class='alert_menu_shopping_car_list_title'>"),
    (t += GenerateNormalString("價格:", "text-align:center;")),
    (t += "</div>"),
    (t += "<div class='alert_menu_shopping_car_list_title'>"),
    (t += GenerateNormalString(e.price)),
    (t += "</div>"),
    (t += "<div class='alert_menu_shopping_car_list_minus' onclick='DeleteSelectedClass(" + e.index + ")'>"),
    (t += GenerateNormalString("X", "text-align:center;" + button_cancel_color)),
    (t += "</div>"),
    (t += "</div>")
  );
}
function ShowVideoList(e, t) {
  if (gToken.length != 0) {
    SetDefaultAlerMenu(), $(".alert_menu").append(GenerateVideoList());
    var n = new Array();
    2 == t ? n.push(gReal_classes[e].id) : n.push(gBought_classes[e].id), SendCommand(CMD_GET_CLASS_CONTENT, CreateJSONObject(CMD_GET_CLASS_CONTENT, n));
  } else {
    alert("請先登入");
  }
}
function ShowVideo(e, t) {
  var n = $("[id='video_list_content_" + e + "']");
  1 != gClass_content.chapters[t].disableFlag &&
    2 != gClass_content.chapters[t].disableFlag &&
    (n.is(":hidden")
      ? (n.slideDown(), $("[id='video_list_content_src_" + e + "']").attr("src", gClass_content.chapters[t].link))
      : (n.slideUp(), $("[id='video_list_content_src_" + e + "']").attr("src", "")));
}
function BuyClass(e) {
  if (0 != gToken.length) {
    for (var t = !1, n = 0; n < gShoppingCarList.length; n++) gShoppingCarList[n].index == e && (t = !0);
    if (t) {
      for (n = 0; n < gShoppingCarList.length; n++) gShoppingCarList[n].index == e && (gShoppingCarList.splice(n, 1), (n = -1));
      UpdateUnboughtClass();
    } else {
      var a = new Object();
      (a.index = e), (a.duration = $("#duration_" + e).val()), (a.price = $("#price_" + e).html()), gShoppingCarList.push(a), (gIsBuy = !0), UpdateUnboughtClass();
    }
  } else alert("請先登入");
}
function DeleteSelectedClass(e) {
  for (var t = 0; t < gShoppingCarList.length; t++) gShoppingCarList[t].index == e && (gShoppingCarList.splice(t, 1), (t = -1));
  UpdateUnboughtClass(), ShowShoppingCar();
}
function ConfirmShoppingCar() {
  gIsBuy ? confirm("請再次確認購買的課程與時間長度") && CommitShopping() : HideAlertMenu();
}
function CommitShopping() {
  if (gIsBuy) {
    for (var e = new Array(), t = 0; t < gShoppingCarList.length; t++) {
      var n = gClasses[gShoppingCarList[t].index],
        a = new Object();
      (a.course_name = n.name), (a.course_id = n.id), (a.duration = gShoppingCarList[t].duration), (a.price = gShoppingCarList[t].price), e.push(a);
    }
    SendCommand(CMD_BUY_CLASS, CreateJSONObject(CMD_BUY_CLASS, e));
  } else HideAlertMenu();
}
function ChangePrice(e) {
  for (var t = $("#duration_" + e).val(), n = 0; n < gClasses[e].specs.length; n++) gClasses[e].specs[n].duration == t && $("#price_" + e).html(gClasses[e].specs[n].price);
}
function ShowAttach() {
  $("#attach_list").toggle();
}
function ChangeToVideoPage(e) {
  window.open("https://www.youtube.com/watch?v=" + e, "_blank");
}
function ShowNormalQuestionContent(e) {
  var t = $("#normal_question_content_" + e);
  t.is(":hidden") ? t.slideDown() : t.slideUp();
}
function UpdateUnboughtClass() {
  for (var e = 0; e < gClasses.length; e++) $("#class_status_" + e).html("加入購物車"), $("#duration_" + e).attr("disabled", !1);
  for (e = 0; e < gShoppingCarList.length; e++) $("#class_status_" + gShoppingCarList[e].index).html("已放入"), $("#duration_" + gShoppingCarList[e].index).attr("disabled", !0);
}
function UpdateTotalPrice() {
  if (0 != gShoppingCarList.length) {
    for (var e = 0, t = 0; t < gShoppingCarList.length; t++) e += parseInt(gShoppingCarList[t].price);
    $("#buy_error_text")
      .html("總計: " + e)
      .css("color", "#000");
  }
}
function ShowLargeImage(detailIndex, imgIndex) {
  var style = "background: url('" + gActivitys[detailIndex].content.data.imgs[imgIndex] + "') no-repeat center; background-size: contain;";
  $(".largeImage_content").attr("style", style);
  $(".largeImage").show();
}
function CloseLargeImage() {
  $(".largeImage").hide();
}
function CloseActivityDetail(index) {
  $("#act_detail_" + index)
    .html("")
    .hide();
}
