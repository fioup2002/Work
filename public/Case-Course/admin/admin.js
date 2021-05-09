function InitialScreen() {
  if (0 != localStorage.length && 0 != localStorage.token.length) {
    gToken = localStorage.token;
  } else {
    // window.location.assign("../index.htm");
  }
  $("body").append(GeneratePanel());
  $("body").append(GenerateContent());
  ChangeContent(0);
}
function GetClassFromID(e) {
  for (var t = new Object(), a = 0; a < gAllModifyClasses.length; a++) gAllModifyClasses[a].id == e && (t = gAllModifyClasses[a]);
  return t;
}
function GetClassName(e) {
  for (var t = "", a = 0; a < gAllModifyClasses.length; a++) gAllModifyClasses[a].id == e && (t = gAllModifyClasses[a].name);
  return t;
}
function DeleteAttachName(e, t) {
  for (var a = 0; a < e.chapters.length; a++) for (var i = 0; i < e.chapters[a].attachFile_map.length; i++) e.chapters[a].attachFile_map[i] == t && e.chapters[a].attachFile_map.splice(i, 1);
}
function AddAttachName(e, t, a) {
  if (-1 != t) {
    for (var i = !1, l = 0; l < e.chapters[t].attachFile_map.length; l++) e.chapters[t].attachFile_map[l] == a && (i = !0);
    i || e.chapters[t].attachFile_map.push(a);
  }
}
function DefaultClass() {
  var e = new Object();
  return (
    (e.id = ""),
    (e.name = "新增課程"),
    (e.courseType = 1),
    (e.description = ""),
    (e.specs = new Array()),
    (e.pics = new Array()),
    (e.chapters = new Array()),
    (e.attachFiles = new Array()),
    (e.ext_data = new Object()),
    (e.ext_data.intro_video = ""),
    e
  );
}
function GenerateNormalString(e, t, a) {
  var i = "";
  return (i += "<table>"), (i += "<td id='" + a + "' class='normal_string' style='" + t + "'>" + e + "</td>"), (i += "</table>");
}
function GenerateBorder() {
  return "<div class='border'>", "</div>", "<div class='border'></div>";
}
function GetValidTime(e, t) {
  var a = "";
  if (t) {
    GetPlusZeroValue(parseInt(e / 60 / 60 / 24, 10)), GetPlusZeroValue(parseInt((e / 60 / 60) % 24, 10)), GetPlusZeroValue(parseInt((e / 60) % 60, 10));
    a = parseInt(e / 60 / 60 / 24, 10) + "天";
  } else {
    var i = new Date(1e3 * e),
      l = i.getFullYear(),
      s = ["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"][i.getMonth()],
      n = GetPlusZeroValue(i.getDate()),
      _ = GetPlusZeroValue(i.getHours()),
      r = GetPlusZeroValue(i.getMinutes());
    GetPlusZeroValue(i.getSeconds());
    a = l + "/" + s + "/" + n + " " + _ + ":" + r;
  }
  return a;
}
function GetPlusZeroValue(e) {
  return e < 10 && (e = "0" + e), e;
}
function GeneratePanel() {
  var e = "";
  e += "<div class='panel'>";
  for (var t = 0; t < PAGE_MENUS.length - 1; t++) e += GeneratePanelButton(t);
  return (
    (e += "<div class='panel_button' onclick='ChangeContent(" + (PAGE_MENUS.length - 1) + ")' style='height:66px;'>"),
    (e += GenerateNormalString("回到首頁", "text-align:right;font-size: 30px;font-weight:bold;letter-spacing:5", "")),
    (e += "</div>"),
    (e += "</div>")
  );
}
function GeneratePanelButton(e) {
  var t = "";
  return (t += "<div class='panel_button' onclick='ChangeContent(" + e + ")'>"), (t += GenerateNormalString(PAGE_MENUS[e], "text-align:right", "")), (t += "</div>");
}
function GenerateContent() {
  var e = "";
  return (
    (e += "<div id='content' class='content'>"),
    (e += "<div class='content_header'>"),
    (e += GenerateNormalString("", "text-decoration: underline;font-size: 30px;font-weight:bold;letter-spacing:5", "header_id")),
    (e += "</div>"),
    (e += "<div id='content_body' class='content_body'>"),
    (e += "</div>"),
    (e += "</div>")
  );
}
function GenerateClass(e) {
  var t = "";
  return (
    (t += "<div id='scroll_parent_" + e.id + "' class='class_info'>"),
    (t += "<div class='class_info_id'>"),
    (t += GenerateNormalString(e.id, "", "")),
    (t += "</div>"),
    (t += "<div class='class_info_name'>"),
    (t += GenerateNormalString(e.name, "", "")),
    (t += "</div>"),
    (t += "<div class='class_info_button' onclick='ShowScrollDetail(\"" + e.id + "\");'>"),
    (t += GenerateNormalString("+", "", "")),
    (t += "</div>"),
    (t += "</div>"),
    (t += GenerateClassDetail(e))
  );
}
function GenerateRealClassCheckbox(e) {
  var t = "";
  (t += "<div class='class_info' style='height:165px'>"),
    (t += "<div class='class_info_line'>"),
    (t += "<div class='class_info_id'>"),
    (t += GenerateNormalString(e.id, "", "")),
    (t += "</div>"),
    (t += "<div class='class_info_name'>"),
    (t += GenerateNormalString(e.name, "", "")),
    (t += "</div>"),
    (t += "<div class='class_info_button'>"),
    (t += "<input id='real_class_checkbox_" + e.id + "' style='height:20px;width:20px;margin-left:calc((100%-20px)/2);margin-top:5px;' type='checkbox' onclick='CheckRealClass(\"" + e.id + "\")'>"),
    (t += "</div>"),
    (t += "</div>"),
    (t += "<div class='class_info_line'>"),
    (t += "<div class='class_info_line_label'>"),
    (t += GenerateNormalString("時間", "", "")),
    (t += "</div>"),
    (t += "<select id='checkbox_" + e.id + "_add_day' class='class_info_line_label'>");
  for (var a = 1; a <= 365; a++) (7 != a && 14 != a && 30 != a && 90 != a && 180 != a && 365 != a) || (t += "<option value='" + a + "'>" + a + " 天</option>");
  return (
    (t += "</select>"),
    (t += "<div class='class_info_line_label'>"),
    (t += GenerateNormalString("價格", "", "")),
    (t += "</div>"),
    (t += "<input id='checkbox_" + e.id + "_add_price' type='number' class='class_info_line_label' value='1000'>"),
    (t += "<div class='class_info_line_label' onclick='CheckboxAddDurationPrice(\"" + e.id + "\")'>"),
    (t += GenerateNormalString("新增", "", "")),
    (t += "</div>"),
    (t += "</div>"),
    (t += "<div id='checkbox_detail_" + e.id + "' class='class_info_line_spec'>"),
    (t += "</div>"),
    (t += "</div>"),
    (t += GenerateClassDetail(e))
  );
}
function GenerateClassDetail(e) {
  var t = "";
  // console.log(e.id,e.isFree);
  // console.log(e);
  if (e.isFree == undefined) {
    e.isFree = 0;
  }
  return (
    (t += "<div id='scroll_detail_" + e.id + "' class='class_info_detail'>"),
    1 == gPageIndex &&
      ((t += GenerateClassInfo(e.id, "類別:", e.courseType, "type")),
      (t += GenerateClassInfo(e.id, "收費:", e.isFree, "free")),
      (t += GenerateClassInfo(e.id, "名字:", e.name, "name")),
      (t += GenerateClassInfo(e.id, "簡介:", e.description, "description")),
      (1 == e.courseType || 3 == e.courseType) &&
        (null == e.ext_data && (e.ext_data = new Object()), null == e.ext_data.intro_video && (e.ext_data.intro_video = ""), (t += GenerateClassInfo(e.id, "影片:", e.ext_data.intro_video, "link"))),
      (t += GenerateClassInfoPic(e.id, "圖片:", e.pics)),
      (t += GenerateClassInfoSpec(e.id, "規格:", e.specs, e)),
      (t += GenerateClassInfoChapter(e.id, "章節:", e.courseType)),
      (t += GenerateClassInfoAttatch(e.id, "附件:")),
      (t += GenerateClassSaveButtonLine(e.id))),
    (t += "</div>")
  );
}
function GenerateClassInfo(e, t, a, i) {
  var l = "";
  l += "<div id='class_line_" + e + "_" + i + "' class='class_info_detail_attibute'>";
  l += "<div class='class_info_detail_attibute_label'>";
  l += GenerateNormalString(t, "", "");
  l += "</div>";
  l += "<div class='class_info_detail_attibute_content'>";
  if (i == "type") {
    if (e.length == 0) {
      l += "<select id='add_class_type' class='fill_parent' onchange='ChangeAddClass()'>";
      l += "<option value='1'>線上課程</option>";
      l += "<option value='2'>線下課程</option>";
      // l += "<option value='3'>免費課程</option>";
    } else {
      l += "<select class='fill_parent' disabled>";
      if (a == 1 || a == 3) {
        l += "<option value='1' selected>線上課程</option>";
        l += "<option value='2'>線下課程</option>";
      } else if (a == 2) {
        l += "<option value='1'>線上課程</option>";
        l += "<option value='2' selected>線下課程</option>";
      }
    }
    l += "</select>";
  }
  "name" == i
    ? (l += "<input id='class_" + e + "_" + i + "'  type='text' class='fill_parent' value='" + a + "' onkeyup='ConfirmName(\"" + e + "\")' onchange='ConfirmName(\"" + e + "\")'>")
    : "description" == i
    ? (l += "<input id='class_" + e + "_" + i + "'  type='text' class='fill_parent' value='" + a + "' onkeyup='ConfirmDesciption(\"" + e + "\")'  onchange='ConfirmDesciption(\"" + e + "\")'>")
    : "link" == i
    ? (l += "<input id='class_" + e + "_" + i + "'  type='text' class='fill_parent' value='" + a + "' onkeyup='ConfirmLink(\"" + e + "\")'>")
    : "id" == i || "ref_id" == i
    ? (l += "<input id='class_" + e + "_" + i + "'  type='text' class='fill_parent' value='" + a + "' onkeyup='SearchOrder(\"" + i + "\")'>")
    : ("user_id" != i && "user_name" != i) || (l += "<input id='class_" + e + "_" + i + "'  type='text' class='fill_parent' value='" + a + "' onkeyup='SearchUser(\"" + i + "\")'>");
  if (i == "free") {
    l += "<select id='class_" + e + "_" + i + "' class='fill_parent' onchange='ConfirmFree(\"" + e + "\")'>";
    if (a == 0) {
      l += "<option value='0' selected>收費</option>";
      l += "<option value='1'>免費</option>";
    } else {
      l += "<option value='0'>收費</option>";
      l += "<option value='1' selected>免費</option>";
    }
    l += "</select>";
  }
  l += "</div>";
  l += "</div>";
  if (e == "" && i == "free") {
    l = "";
  }
  return l;
}
function GenerateClassInfoPic(e, t, a) {
  var i = "";
  return (
    (i += "<div class='class_info_detail_attibute' style='height: 150px;'>"),
    (i += "<div class='class_info_detail_attibute_label'>"),
    (i += GenerateNormalString(t, "", "")),
    (i += "</div>"),
    (i += "<div id='class_" + e + "_image_block' class='class_info_detail_attibute_content'>"),
    (i += GeneratePictureBlock(e, a)),
    (i += "</div>"),
    (i += "</div>")
  );
}
function GeneratePictureBlock(e, t) {
  var a = "";
  if (
    ((null != t && 0 != t.length) ||
      ((a += "<div class='class_info_detail_attibute_content_img' style='margin-left:0;'>"),
      (a += "<div id='class_" + e + "_add_image' class='class_info_detail_attibute_content_img_image'>"),
      (a += GenerateNormalString("+", "font-size: 50px;", "")),
      (a += "</div>"),
      (a += "<div class='class_info_detail_attibute_content_img_option'>"),
      (a += "<select class='class_info_detail_attibute_content_img_type'>"),
      (a += "<option value='thumb'>縮圖</option>"),
      (a += "</select>"),
      (a += "<div class='class_info_detail_attibute_content_img_upload'>"),
      (a += "<input id='class_" + e + "_add_image_file' type='file' class='fill_parent' style='z-index:0;opacity:0;' onchange='ReadURL(this,\"" + e + "\")' accept='image/*'>"),
      (a += "<div class='fill_parent' style='z-index:1;margin-top:-30px'>"),
      (a += GenerateNormalString("上傳", "", "")),
      (a += "</div>"),
      (a += "</div>"),
      (a += "</div>"),
      (a += "</div>")),
    null != t)
  )
    for (var i = 0; i < t.length; i++) a += GeneratePicture(e, i, t[i]);
  return a;
}
function GeneratePicture(e, t, a) {
  var i = "";
  return (
    (i += 0 == t ? "<div class='class_info_detail_attibute_content_img' style='margin-left:0px;'>" : "<div class='class_info_detail_attibute_content_img'>"),
    (i += "<div class='class_info_detail_attibute_content_img_image'>"),
    (i += "<img id='class_" + e + "_image_" + t + "' class='fill_parent' src='" + a.path + "'>"),
    (i += "</div>"),
    (i += "<div class='class_info_detail_attibute_content_img_option'>"),
    (i += "<select class='class_info_detail_attibute_content_img_type' disabled>"),
    (i += "<option value='thumb'>縮圖</option>"),
    (i += "</select>"),
    (i += "<div class='class_info_detail_attibute_content_img_upload'>"),
    (i += "<input id='class_" + e + "_" + t + "_image_file' type='file' class='fill_parent' style='z-index:0;opacity:0;' onchange='ReadURL(this,\"" + e + '",' + t + ")' accept='image/*'>"),
    (i += "<div class='fill_parent' style='z-index:1;margin-top:-30px'>"),
    (i += GenerateNormalString("變更", "", "")),
    (i += "</div>"),
    (i += "</div>"),
    (i += "<div class='class_info_detail_attibute_content_img_upload' onclick='ConfirmDeleteImage(\"" + e + '",' + t + ")'>"),
    (i += GenerateNormalString("刪除", "", "")),
    (i += "</div>"),
    (i += "</div>"),
    (i += "</div>")
  );
}
function GenerateClassInfoSpec(e, t, a, i) {
  var l = "";
  return (
    0 == e.length
      ? (l += "<div id='spec_block' class='class_info_detail_spec_attibute'>")
      : 1 == i.courseType || 3 == i.courseType
      ? (l += "<div class='class_info_detail_spec_attibute'>")
      : (l += "<div class='class_info_detail_spec_attibute' style='display:none'>"),
    (l += "<div class='class_info_detail_attibute_label'>"),
    (l += GenerateNormalString(t, "", "")),
    (l += "</div>"),
    (l += "<div id='class_" + e + "_specs' class='class_info_detail_attibute_content'>"),
    (l += GenerateSpecBlock(e, a)),
    (l += "</div>"),
    (l += "</div>")
  );
}
function GenerateDayMenu(e, t, a, i, l) {
  var s = "";
  s += "<select id='" + e + "' class='fill_parent' onchange='ConfirmChangeDuration(\"" + a + '",' + i + ',"' + l + "\")'>";
  for (var n = 1; n <= 365; n++)
    (7 != n && 14 != n && 30 != n && 90 != n && 180 != n && 365 != n) || (s += t == n ? "<option value='" + n + "' selected>" + n + " 天</option>" : "<option value='" + n + "'>" + n + " 天</option>");
  return (s += "</select>");
}
function GenerateSpecBlock(e, t) {
  var a = "";
  if (
    ((a += "<div class='class_info_detail_attibute_content_spec' style='margin-left:0px;'>"),
    (a += "<div class='class_info_detail_attibute_content_spec_line'>"),
    (a += "<div class='class_info_detail_attibute_content_spec_line_label'>"),
    (a += GenerateNormalString("時間", "", "")),
    (a += "</div>"),
    (a += "<div class='class_info_detail_attibute_content_spec_line_input'>"),
    (a += GenerateDayMenu("class_" + e + "_add_day", 10, "spec_add", 0)),
    (a += "</div>"),
    (a += "</div>"),
    (a += "<div class='class_info_detail_attibute_content_spec_line'>"),
    (a += "<div class='class_info_detail_attibute_content_spec_line_label'>"),
    (a += GenerateNormalString("價格", "", "")),
    (a += "</div>"),
    (a += "<div class='class_info_detail_attibute_content_spec_line_input'>"),
    (a += "<input id='class_" + e + "_add_price' type='number' class='fill_parent'>"),
    (a += "</div>"),
    (a += "</div>"),
    (a += "<div class='class_info_detail_attibute_content_spec_line'>"),
    (a += "<div class='class_info_detail_attibute_content_spec_line_button' onclick='ConfirmAddSpec(\"" + e + "\")'>"),
    (a += GenerateNormalString("新增", "", "")),
    (a += "</div>"),
    (a += "</div>"),
    (a += "</div>"),
    null != t)
  ) {
    a += "<div class='class_info_detail_attibute_content_spec_block'>";
    for (var i = 0; i < t.length; i++) a += GenerateSpec(e, t[i], i);
    a += "</div>";
  }
  return a;
}
function GenerateSpec(e, t, a) {
  var i = "";
  return (
    (i += "<div class='class_info_detail_attibute_content_spec_block_line'>"),
    (i += "<div class='class_info_detail_attibute_content_spec_block_line_line'>"),
    (i += "<div class='class_info_detail_attibute_content_spec_block_line_label'>"),
    (i += GenerateNormalString("時間:", "", "")),
    (i += "</div>"),
    (i += "<div class='class_info_detail_attibute_content_spec_block_line_input'>"),
    (i += GenerateDayMenu("class_" + e + "_" + a + "_day", t.duration / 86400, "spec_info", a, e)),
    (i += "</div>"),
    (i += "</div>"),
    (i += "<div class='class_info_detail_attibute_content_spec_block_line_line'>"),
    (i += "<div class='class_info_detail_attibute_content_spec_block_line_label'>"),
    (i += GenerateNormalString("價格:", "", "")),
    (i += "</div>"),
    (i += "<div class='class_info_detail_attibute_content_spec_block_line_input'>"),
    (i +=
      "<input id='class_" +
      e +
      "_" +
      a +
      "_price' type='number' class='fill_parent' value='" +
      t.price +
      "' onkeyup='ConfirmSpec(\"" +
      e +
      '",' +
      a +
      ")' onchange='ConfirmSpec(\"" +
      e +
      '",' +
      a +
      ")'>"),
    (i += "</div>"),
    (i += "</div>"),
    (i += "<div class='class_info_detail_attibute_content_spec_block_line_line'>"),
    (i += "<div class='class_info_detail_attibute_content_spec_block_line_label' style='margin-left:calc((100% - 40px) / 2)' onclick='ConfirmDeleteSpec(\"" + e + '",' + a + ")'>"),
    (i += GenerateNormalString("刪除", "", "")),
    (i += "</div>"),
    (i += "</div>"),
    (i += "</div>")
  );
}
function GenerateClassButtonLine(e) {
  var t = "";
  t += "<div class='class_info_detail_button_line'>";
  var a = GetClassFromID(e);
  return (
    0 == e.length || 1 != gPageIndex
      ? (t +=
          "order" != e && "order_save" != e && "user" != e && "real_class_check" != e
            ? "<div class='class_info_detail_button_line_button' style='visibility:hidden;'>"
            : "<div class='class_info_detail_button_line_button' style='display:none'>")
      : 1 == a.isActive
      ? (t += "<div class='class_info_detail_button_line_button' onclick='CloseClass(\"" + e + "\")'>")
      : (t += "<div class='class_info_detail_button_line_button' onclick='OpenClass(\"" + e + "\")'>"),
    1 == a.isActive ? (t += GenerateNormalString("關閉課程", "font-size:40px", "")) : (t += GenerateNormalString("開啟課程", "font-size:40px", "")),
    (t += "</div>"),
    0 == gPageIndex
      ? (t += "<div class='class_info_detail_button_line_button' onclick='SaveUser(\"" + e + "\");'>")
      : 1 == gPageIndex && (t += "<div class='class_info_detail_button_line_button' onclick='SaveClass(\"" + e + "\")'>"),
    "order" == e
      ? ((t += "<div class='class_info_detail_button_line_button' onclick='GetAllOrder()' style='width:50%;margin-left:25%;'>"),
        (t += GenerateNormalString("顯示所有尚未確認的訂單", "font-size:30px", "")))
      : "order_save" == e
      ? ((t += "<div class='class_info_detail_button_line_button' onclick='SaveOrder()' style='width:50%;margin-left:25%;'>"), (t += GenerateNormalString("確認", "font-size:30px", "")))
      : "real_class_check" == e
      ? ((t += "<div class='class_info_detail_button_line_button' onclick='SaveRealClassList()' style='width:50%;margin-left:25%;'>"), (t += GenerateNormalString("確認", "font-size:30px", "")))
      : "user" == e
      ? ((t += "<div class='class_info_detail_button_line_button' onclick='GetAllMember()' style='width:50%;margin-left:25%;'>"), (t += GenerateNormalString("顯示所有使用者", "font-size:30px", "")))
      : (t += GenerateNormalString("儲存", "font-size:40px", "")),
    (t += "</div>"),
    (t += "</div>")
  );
}
function GenerateClassSaveButtonLine(e) {
  var t = GetClassFromID(e),
    a = "font-size:25px",
    i = "";
  return (
    (i += "<div class='class_info_detail_button_line'>"),
    0 == e.length
      ? ((i += "<div id='temp_save' class='class_info_detail_button_line_button' style='width: 100px;margin-left:calc((100% - 100px) / 2);' onclick='SaveClass(\"" + e + '",' + !0 + ")'>"),
        (i += GenerateNormalString("暫存課程", a, "")))
      : 1 == t.courseType || 3 == t.courseType
      ? ((i += "<div id='temp_save' class='class_info_detail_button_line_button' style='width: 100px;margin-left:calc((100% - 100px * 2) / 3);' onclick='SaveClass(\"" + e + '",' + !0 + ")'>"),
        (i += GenerateNormalString("暫存課程", a, "")),
        (i += "</div>"),
        1 == t.isActive
          ? ((i += "<div class='class_info_detail_button_line_button' style='width: 100px;margin-left:calc((100% - 100px * 2) / 3);'  onclick='CloseClass(\"" + e + "\")'>"),
            (i += GenerateNormalString("關閉課程", a, "")))
          : ((i += "<div class='class_info_detail_button_line_button' style='width: 100px;margin-left:calc((100% - 100px * 2) / 3);'  onclick='OpenClass(\"" + e + "\")'>"),
            (i += GenerateNormalString("開啟課程", a, ""))))
      : (1 == t.isActive
          ? ((i += "<div class='class_info_detail_button_line_button' style='width: 100px;margin-left:calc((100% - 100px * 2) / 3);'   onclick='CloseClass(\"" + e + "\")'>"),
            (i += GenerateNormalString("關閉課程", a, "")))
          : ((i += "<div class='class_info_detail_button_line_button' style='width: 100px;margin-left:calc((100% - 100px * 2) / 3);'   onclick='OpenClass(\"" + e + "\")'>"),
            (i += GenerateNormalString("開啟課程", a, ""))),
        (i += "</div>"),
        (i += "<div class='class_info_detail_button_line_button' style='width: 100px;margin-left:calc((100% - 100px * 2) / 3);'   onclick='SaveClass(\"" + e + '",' + !1 + ")'>"),
        2 == t.courseType ? (i += GenerateNormalString("儲存", a, "")) : (i += GenerateNormalString("儲存並開啟", a, ""))),
    (i += "</div>"),
    (i += "</div>"),
    (1 == t.courseType || 3 == t.courseType) &&
      ((i += "<div class='class_info_detail_button_line'>"),
      (i += "<div class='class_info_detail_button_line_button' style='width: 150px;margin-left:calc((100% - 150px) / 2);' onclick='SaveClass(\"" + e + '",' + !1 + ")'>"),
      (i += GenerateNormalString("儲存並開啟", a, "")),
      (i += "</div>"),
      (i += "</div>")),
    i
  );
}
function GenerateClassInfoChapter(e, t, a) {
  var i = "";
  return (
    (i += "<div class='class_info_detail_chapter_attibute'>"),
    (i += "<div class='class_info_detail_attibute_label'>"),
    (i += GenerateNormalString(t, "", "")),
    (i += "</div>"),
    (i += "<div class='class_info_detail_attibute_content'>"),
    (i += GenerateAddChapter(e, a)),
    (i += "<div id='class_" + e + "_chapters' class='class_info_detail_attibute_content_chapter_block'>"),
    (i += "</div>"),
    (i += "</div>"),
    (i += "</div>")
  );
}
function GenerateAddChapter(e, t) {
  var a = "";
  (a += "<div class='class_info_detail_attibute_content_chapter' style='margin-left:0px;margin-top:0px;'>"),
    (a += "<div class='class_info_detail_attibute_content_chapter_line'>"),
    (a += "<div class='class_info_detail_attibute_content_chapter_line_label'>"),
    (a += GenerateNormalString("名稱:", "", "")),
    (a += "</div>"),
    (a += "<div class='class_info_detail_attibute_content_chapter_line_input'>"),
    (a += "<input type='text' id='class_" + e + "_add_chapter_name' class='fill_parent'>"),
    (a += "</div>"),
    (a += "</div>"),
    (a += "<div class='class_info_detail_attibute_content_chapter_line'>"),
    (a += "<div class='class_info_detail_attibute_content_chapter_line_label'>"),
    (a += GenerateNormalString("描述:", "", "")),
    (a += "</div>"),
    (a += "<div class='class_info_detail_attibute_content_chapter_line_input'>"),
    (a += "<input type='text' id='class_" + e + "_add_chapter_description' class='fill_parent'>"),
    (a += "</div>"),
    (a += "</div>"),
    (a += "<div class='class_info_detail_attibute_content_chapter_line'>"),
    (a += "<div class='class_info_detail_attibute_content_chapter_line_label'>"),
    (a += GenerateNormalString("影片ID:", "", "")),
    (a += "</div>"),
    (a += "<div class='class_info_detail_attibute_content_chapter_line_input'>"),
    (a += "<input type='text' id='class_" + e + "_add_chapter_link' class='fill_parent'>"),
    (a += "</div>"),
    (a += "</div>"),
    (a +=
      1 == t || 3 == t
        ? "<div id='start_time' class='class_info_detail_attibute_content_chapter_line' style='visibility:hidden'>"
        : "<div id='start_time' class='class_info_detail_attibute_content_chapter_line'>"),
    (a += "<div class='class_info_detail_attibute_content_chapter_line_label'>"),
    (a += GenerateNormalString("開始日:", "", "")),
    (a += "</div>"),
    (a += "<div class='class_info_detail_attibute_content_chapter_line_input'>");
  var i = GetValidTime(new Date().getTime() / 1e3, !1)
    .split(" ")[0]
    .split("/");
  return (
    (a += "<input id='class_" + e + "_add_chapter_start_time' class='fill_parent' type='date' value= " + (i = i[0] + "-" + i[1] + "-" + i[2]) + ">"),
    (a += "</div>"),
    (a += "</div>"),
    (a +=
      1 == t || 3 == t
        ? "<div id='end_time' class='class_info_detail_attibute_content_chapter_line' style='visibility:hidden'>"
        : "<div id='end_time' class='class_info_detail_attibute_content_chapter_line'>"),
    (a += "<div class='class_info_detail_attibute_content_chapter_line_label'>"),
    (a += GenerateNormalString("到期日:", "", "")),
    (a += "</div>"),
    (a += "<div class='class_info_detail_attibute_content_chapter_line_input'>"),
    (a += "<input id='class_" + e + "_add_chapter_end_time' class='fill_parent' type='date' value= " + i + ">"),
    (a += "</div>"),
    (a += "</div>"),
    (a += "<div class='class_info_detail_attibute_content_chapter_line'>"),
    (a += "<div class='class_info_detail_attibute_content_chapter_line_label' style='margin-left: 40%;width:20%;' onclick='ConfirmAddChapter(\"" + e + "\")'>"),
    (a += GenerateNormalString("新增", "", "")),
    (a += "</div>"),
    (a += "</div>"),
    (a += "</div>")
  );
}
function GenerateChapter(e, t, a) {
  var i = "";
  (i += "<div class='class_info_detail_attibute_content_chapter_block_block'>"),
    (i += "<div class='class_info_detail_attibute_content_chapter_line'>"),
    (i += "<div class='class_info_detail_attibute_content_chapter_line_label'>"),
    (i += GenerateNormalString("名稱:", "", "")),
    (i += "</div>"),
    (i += "<div class='class_info_detail_attibute_content_chapter_line_input'>"),
    (i += "<input type='text' id='class_" + e + "_" + a + "_chapter_name' class='fill_parent'  value='" + t.chapNo + "' disabled>"),
    (i += "</div>"),
    (i += "</div>"),
    (i += "<div class='class_info_detail_attibute_content_chapter_line'>"),
    (i += "<div class='class_info_detail_attibute_content_chapter_line_label'>"),
    (i += GenerateNormalString("描述:", "", "")),
    (i += "</div>"),
    (i += "<div class='class_info_detail_attibute_content_chapter_line_input'>"),
    (i += "<input type='text' id='class_" + e + "_" + a + "_chapter_description' class='fill_parent' value='" + t.description + "' onkeyup='ConfirmChapter(\"" + e + '",' + a + ")'>"),
    (i += "</div>"),
    (i += "</div>"),
    (i += "<div class='class_info_detail_attibute_content_chapter_line'>"),
    (i += "<div class='class_info_detail_attibute_content_chapter_line_label'>"),
    (i += GenerateNormalString("影片ID:", "", "")),
    (i += "</div>"),
    (i += "<div class='class_info_detail_attibute_content_chapter_line_input'>"),
    (i +=
      "<input type='text' id='class_" +
      e +
      "_" +
      a +
      "_chapter_link' class='fill_parent' value='" +
      t.link.split("https://player.vimeo.com/video/")[1] +
      "' onkeyup='ConfirmChapter(\"" +
      e +
      '",' +
      a +
      ")'>"),
    (i += "</div>"),
    (i += "</div>");
  var l,
    s = GetClassFromID(e);
  return (
    1 == s.courseType || 3 == s.courseType
      ? (i += "<div class='class_info_detail_attibute_content_chapter_line' style='visibility:hidden'>")
      : (i += "<div class='class_info_detail_attibute_content_chapter_line'>"),
    (i += "<div class='class_info_detail_attibute_content_chapter_line_label'>"),
    (i += GenerateNormalString("開始日:", "", "")),
    (i += "</div>"),
    (i += "<div class='class_info_detail_attibute_content_chapter_line_input'>"),
    (i +=
      "<input id='class_" +
      e +
      "_" +
      a +
      "_chapter_start_time' class='fill_parent' type='date' value='" +
      (l = (l = GetValidTime(t.startTime, !1).split(" ")[0].split("/"))[0] + "-" + l[1] + "-" + l[2]) +
      "' onchange='ConfirmChapter(\"" +
      e +
      '",' +
      a +
      ")'>"),
    (i += "</div>"),
    (i += "</div>"),
    1 == s.courseType || 3 == s.courseType
      ? (i += "<div class='class_info_detail_attibute_content_chapter_line' style='visibility:hidden'>")
      : (i += "<div class='class_info_detail_attibute_content_chapter_line'>"),
    (i += "<div class='class_info_detail_attibute_content_chapter_line_label'>"),
    (i += GenerateNormalString("到期日:", "", "")),
    (i += "</div>"),
    (i += "<div class='class_info_detail_attibute_content_chapter_line_input'>"),
    (i +=
      "<input id='class_" +
      e +
      "_" +
      a +
      "_chapter_end_time' class='fill_parent' type='date' value='" +
      (l =
        (l = GetValidTime(t.expireTime + 60 - 86400, !1)
          .split(" ")[0]
          .split("/"))[0] +
        "-" +
        l[1] +
        "-" +
        l[2]) +
      "' onchange='ConfirmChapter(\"" +
      e +
      '",' +
      a +
      ")'>"),
    (i += "</div>"),
    (i += "</div>"),
    (i += "<div class='class_info_detail_attibute_content_chapter_line'>"),
    (i += "<div class='class_info_detail_attibute_content_chapter_line_label' style='margin-left:calc((100% - 50px) / 2);width:50px;' onclick='ConfirmDeleteChapter(\"" + e + '",' + a + ")'>"),
    (i += GenerateNormalString("刪除", "", "")),
    (i += "</div>"),
    (i += "</div>"),
    (i += "</div>")
  );
}
function GenerateClassInfoAttatch(e, t) {
  var a = "";
  return (
    (a += "<div class='class_info_detail_attacth_attibute'>"),
    (a += "<div class='class_info_detail_attibute_label'>"),
    (a += GenerateNormalString(t, "", "")),
    (a += "</div>"),
    (a += "<div class='class_info_detail_attibute_content'>"),
    (a += GenerateAddAttatch(e)),
    (a += "<div id='class_" + e + "_attachs' class='class_info_detail_attibute_content_attach_block'>"),
    (a += "</div>"),
    (a += "</div>"),
    (a += "</div>")
  );
}
function GenerateAddAttatch(e) {
  var t = "";
  return (
    (t += "<div class='class_info_detail_attibute_content_attach' style='margin-left:0px;margin-top:0px'>"),
    (t += "<div class='class_info_detail_attibute_content_chapter_line'>"),
    (t += "<div class='class_info_detail_attibute_content_attatch_line_label'>"),
    (t += GenerateNormalString("名稱:", "", "")),
    (t += "</div>"),
    (t += "<div class='class_info_detail_attibute_content_attatch_line_input'>"),
    (t += "<input type='text' id='class_" + e + "_add_attach_name' class='fill_parent'>"),
    (t += "</div>"),
    (t += "</div>"),
    (t += "<div class='class_info_detail_attibute_content_chapter_line'>"),
    (t += "<div class='class_info_detail_attibute_content_attatch_line_label'>"),
    (t += GenerateNormalString("路徑:", "", "")),
    (t += "</div>"),
    (t += "<div class='class_info_detail_attibute_content_attatch_line_input'>"),
    (t += "<input type='text' id='class_" + e + "_add_attach_link' class='fill_parent'>"),
    (t += "</div>"),
    (t += "</div>"),
    (t += "<div class='class_info_detail_attibute_content_chapter_line'>"),
    (t += "<div class='class_info_detail_attibute_content_attatch_line_label'>"),
    (t += GenerateNormalString("所屬章節:", "", "")),
    (t += "</div>"),
    (t += "<div class='class_info_detail_attibute_content_attatch_line_input'>"),
    (t += "<select id='class_" + e + "_add_attach_chapter' class='fill_parent belong_chapter'>"),
    (t += "</select>"),
    (t += "</div>"),
    (t += "</div>"),
    (t += "<div class='class_info_detail_attibute_content_chapter_line'>"),
    (t += "<div class='class_info_detail_attibute_content_attatch_line_label' style='margin-left: 40%;width:20%;' onclick='ConfirmAddAttatch(\"" + e + "\")'>"),
    (t += GenerateNormalString("新增", "", "")),
    (t += "</div>"),
    (t += "</div>"),
    (t += "</div>")
  );
}
function GenerateAttach(e, t, a) {
  var i = "";
  return (
    (i += "<div class='class_info_detail_attibute_content_attach_block_block'>"),
    (i += "<div class='class_info_detail_attibute_content_chapter_line'>"),
    (i += "<div class='class_info_detail_attibute_content_attatch_line_label'>"),
    (i += GenerateNormalString("名稱:", "", "")),
    (i += "</div>"),
    (i += "<div class='class_info_detail_attibute_content_attatch_line_input'>"),
    (i += "<input type='text' id='class_" + e + "_" + a + "_attach_name' class='fill_parent'  value='" + t.name + "' disabled>"),
    (i += "</div>"),
    (i += "</div>"),
    (i += "<div class='class_info_detail_attibute_content_chapter_line'>"),
    (i += "<div class='class_info_detail_attibute_content_attatch_line_label'>"),
    (i += GenerateNormalString("路徑:", "", "")),
    (i += "</div>"),
    (i += "<div class='class_info_detail_attibute_content_attatch_line_input'>"),
    (i += "<input type='text' id='class_" + e + "_" + a + "_attach_link' class='fill_parent' value='" + t.path + "' onkeyup='ConfirmAttatch(\"" + e + '",' + a + ")'>"),
    (i += "</div>"),
    (i += "</div>"),
    (i += "<div class='class_info_detail_attibute_content_chapter_line'>"),
    (i += "<div class='class_info_detail_attibute_content_attatch_line_label'>"),
    (i += GenerateNormalString("所屬章節:", "", "")),
    (i += "</div>"),
    (i += "<div class='class_info_detail_attibute_content_attatch_line_input'>"),
    (i += "<select id='class_" + e + "_" + a + "_attach_chapter' class='fill_parent belong_chapter' onchange='ConfirmAttatch(\"" + e + '",' + a + ")'>"),
    (i += "</select>"),
    (i += "</div>"),
    (i += "</div>"),
    (i += "<div class='class_info_detail_attibute_content_chapter_line'>"),
    (i += "<div class='class_info_detail_attibute_content_attatch_line_label' style='margin-left: 40%;width:20%;' onclick='ConfirmDeleteAttatch(\"" + e + '",' + a + ")'>"),
    (i += GenerateNormalString("刪除", "", "")),
    (i += "</div>"),
    (i += "</div>"),
    (i += "</div>")
  );
}
function UpdateRealClass() {
  var e = "";
  if (0 == gPageIndex) {
    for (var t = 0; t < gRealClasses.length; t++) e += GenerateClass(gRealClasses[t]);
    e += GenerateBorder();
  } else {
    e += "<div class='real_class_check_list' style='height:calc(100% -  63px  - 3px *2) ;'>";
    for (t = 0; t < gRealClasses.length; t++) e += GenerateRealClassCheckbox(gRealClasses[t]);
    (e += "</div>"), (e += GenerateClassButtonLine("real_class_check")), (gCheckClassList = new Array());
  }
  $("#content_body").empty().append(e);
}
function UpdateUser(e) {
  $("#scroll_detail_" + e).empty(),
    $("#scroll_detail_" + e).append(GenerateClassUser(e)),
    $("#scroll_detail_" + e).append("<div style='background:#000;width:100%;height:3px;float:left'></div>"),
    $("#scroll_detail_" + e).append(GenerateNotInClassUser(e)),
    $("#scroll_detail_" + e).append(GenerateClassButtonLine(e));
}
function GenerateClassUser(e) {
  var t = "";
  t += "<div class='class_info_detail_user'>";
  for (var a = 0; a < gClassUser[e].length; a++)
    (t += "<div class='user_list'>"),
      (t += "<div class='user_list_info'>"),
      (t += "<div class='user_list_id'>"),
      (t += GenerateNormalString(gClassUser[e][a].id, "", "")),
      (t += "</div>"),
      (t += "<div class='user_list_name'>"),
      (t += GenerateNormalString(gClassUser[e][a].name, "", "")),
      (t += "</div>"),
      (t += "</div>"),
      (t += "<div class='user_list_button' onclick='RemoveUser(\"" + e + '",' + a + ")'>"),
      (t += GenerateNormalString("移除", "", "")),
      (t += "</div>"),
      (t += "</div>");
  return (t += "</div>");
}
function GenerateNotInClassUser(e) {
  var t = "";
  t += "<div class='class_info_detail_not_in_user'>";
  for (var a = 0; a < gNotInClassUser[e].length; a++)
    (t += "<div class='user_list'>"),
      (t += "<div class='user_list_info'>"),
      (t += "<div class='user_list_id'>"),
      (t += GenerateNormalString(gNotInClassUser[e][a].id, "", "")),
      (t += "</div>"),
      (t += "<div class='user_list_name'>"),
      (t += GenerateNormalString(gNotInClassUser[e][a].name, "", "")),
      (t += "</div>"),
      (t += "</div>"),
      (t += "<div class='user_list_button' onclick='AddUser(\"" + e + '",' + a + ")'>"),
      (t += GenerateNormalString("新增", "", "")),
      (t += "</div>"),
      (t += "</div>");
  return (t += "</div>");
}
function UpdateAllClass() {
  for (var e = "", t = 0; t < gAllModifyClasses.length; t++) e += GenerateClass(gAllModifyClasses[t]);
  (e += GenerateBorder()), $("#content_body").empty().append(e);
  UpdateFree();
}
function UpdateAllClassContent(e) {
  var t = GetClassFromID(e);
  UpdateChapter(t), UpdateAttach(t);
  UpdateFree(t);
}
function UpdateFree(t) {
  if (t != null) {
    $("#class_" + t.id + "_free").val(t.isFree);
  } else {
    for (var i = 0; i < gAllModifyClasses.length; i++) {
      if (gAllModifyClasses[i].courseType == 2) {
        $("#class_line_" + gAllModifyClasses[i].id + "_free").hide();
      }
    }
  }
}
function UpdateChapter(e) {
  $("#class_" + e.id + "_chapters").empty();
  var t = "";
  if (null != e.chapters) {
    t = "";
    for (var a = 0; a < e.chapters.length; a++) t += GenerateChapter(e.id, e.chapters[a], a);
    (t += GenerateBorder()), $("#class_" + e.id + "_chapters").append(t);
  }
}
function UpdateAttach(e) {
  $("#class_" + e.id + "_attachs").empty();
  var t = "";
  if (($("#class_" + e.id + "_attachs").append(t), null != e.attachFiles)) {
    t = "";
    for (var a = 0; a < e.attachFiles.length; a++) t += GenerateAttach(e.id, e.attachFiles[a], a);
    $("#class_" + e.id + "_attachs").append(t);
  }
  UpdateBelongChapter(e);
}
function UpdateBelongChapter(e) {
  $(".belong_chapter").empty();
  var t = "";
  t += "<option value='-1'>------</option>";
  for (var a = 0; a < e.chapters.length; a++) t += "<option value='" + a + "'>" + e.chapters[a].chapNo + "</option>";
  $(".belong_chapter").append(t);
  for (a = 0; a < e.attachFiles.length; a++) {
    for (var i = -1, l = 0; l < e.chapters.length; l++) for (var s = 0; s < e.chapters[l].attachFile_map.length; s++) e.attachFiles[a].name == e.chapters[l].attachFile_map[s] && (i = l);
    $("#class_" + e.id + "_" + a + "_attach_chapter").val(i);
  }
}
function UpdateImage(e) {
  for (var t = new Array(), a = 0; a < gAllModifyClasses.length; a++) gAllModifyClasses[a].id == e && (t = gAllModifyClasses[a].pics);
  $("#class_" + e + "_image_block")
    .empty()
    .append(GeneratePictureBlock(e, t));
}
function UpdateSpec(e) {
  for (var t = new Array(), a = 0; a < gAllModifyClasses.length; a++) gAllModifyClasses[a].id == e && (t = gAllModifyClasses[a].specs);
  $("#class_" + e + "_specs")
    .empty()
    .append(GenerateSpecBlock(e, t));
}
function GenerateOrder() {
  var e = "";
  return (
    (e += GenerateClassInfo("id", "會員ID", "", "id")),
    (e += GenerateClassInfo("ref_id", "訂單編號", "", "ref_id")),
    (e += GenerateClassButtonLine("order")),
    (e += "<div class='order_list'></div>"),
    (e += GenerateClassButtonLine("order_save"))
  );
}
function UpdateOrderList(e) {
  $(".order_list").empty();
  var t = "";
  gCheckOrderList = new Array();
  for (var a = 0; a < gOrderList.length; a++) t += GenerateOrderBlock(gOrderList[a], e);
  $(".order_list").append(t);
}
function GenerateOrderBlock(e, t) {
  var a = "";
  return (
    (a += "<div id='scroll_parent_" + e.ref + "' class='order_list_info'>"),
    "all" == t
      ? ((a += "<div class='order_list_info_checkbox' onclick='CheckOrder(\"" + e.ref + "\")'>"), (a += "<input id='order_" + e.ref + "' type='checkbox' class='fill_parent'>"))
      : (a += "<div class='order_list_info_checkbox'>"),
    (a += "</div>"),
    (a += "<div class='order_list_info_status'>"),
    (a += "<div class='order_list_info_status_line'>"),
    (a += "<div class='order_list_info_status_line_label'>"),
    (a += GenerateNormalString("訂單編號:", "text-align:right;", "")),
    (a += "</div>"),
    (a += "<div class='order_list_info_status_line_content'>"),
    (a += GenerateNormalString(e.ref, "text-align:left;", "")),
    (a += "</div>"),
    (a += "</div>"),
    (a += "<div class='order_list_info_status_line'>"),
    (a += "<div class='order_list_info_status_line_label'>"),
    (a += GenerateNormalString("訂單時間:", "text-align:right;", "")),
    (a += "</div>"),
    (a += "<div class='order_list_info_status_line_content'>"),
    (a += GenerateNormalString(e.createTime, "text-align:left;", "")),
    (a += "</div>"),
    (a += "</div>"),
    (a += "<div class='order_list_info_status_line'>"),
    (a += "<div class='order_list_info_status_line_label'>"),
    (a += GenerateNormalString("訂單狀態:", "text-align:right;", "")),
    (a += "</div>"),
    (a += "<div class='order_list_info_status_line_content'>"),
    (a += GenerateNormalString(GetOrderStatus(e.status), "text-align:left;", "")),
    (a += "</div>"),
    (a += "</div>"),
    (a += "<div class='order_list_info_status_line'>"),
    (a += "<div class='order_list_info_status_line_label'>"),
    (a += GenerateNormalString("購買人:", "text-align:right;", "")),
    (a += "</div>"),
    (a += "<div class='order_list_info_status_line_content'>"),
    (a += GenerateNormalString(e.customer, "text-align:left;", "")),
    (a += "</div>"),
    (a += "</div>"),
    (a += "<div class='order_list_info_status_line'>"),
    (a += "<div class='order_list_info_status_line_label'>"),
    (a += GenerateNormalString("總價:", "text-align:right;", "")),
    (a += "</div>"),
    (a += "<div class='order_list_info_status_line_content'>"),
    (a += GenerateNormalString(e.amount, "text-align:left;", "")),
    (a += "</div>"),
    (a += "</div>"),
    (a += "</div>"),
    (a += "<div class='order_list_info_button' onclick='ShowScrollDetail(\"" + e.ref + "\")'>"),
    (a += GenerateNormalString("+", "", "")),
    (a += "</div>"),
    (a += "</div>"),
    (a += GenerateOrderDetail(e))
  );
}
function GenerateOrderDetail(e) {
  var t = "";
  (t += "<div id='scroll_detail_" + e.ref + "' class='order_list_info_detail'>"),
    null == e.reportInfo && (e.reportInfo = new Object()),
    (t += "<div class='order_list_info_status_line'>"),
    (t += "<div class='order_list_info_status_line_label'>"),
    (t += GenerateNormalString("銀行代碼:", "text-align:right;", "")),
    (t += "</div>"),
    (t += "<div class='order_list_info_status_line_content'>"),
    (t += GenerateNormalString(e.reportInfo.bankCode, "text-align:left;", "")),
    (t += "</div>"),
    (t += "</div>"),
    (t += "<div class='order_list_info_status_line'>"),
    (t += "<div class='order_list_info_status_line_label'>"),
    (t += GenerateNormalString("匯款帳號:", "text-align:right;", "")),
    (t += "</div>"),
    (t += "<div class='order_list_info_status_line_content'>"),
    (t += GenerateNormalString(e.reportInfo.accCode, "text-align:left;", "")),
    (t += "</div>"),
    (t += "</div>"),
    (t += "<div class='order_list_info_status_line'>"),
    (t += "<div class='order_list_info_status_line_label'>"),
    (t += GenerateNormalString("付款時間:", "text-align:right;", "")),
    (t += "</div>"),
    (t += "<div class='order_list_info_status_line_content'>"),
    (t += GenerateNormalString(e.reportInfo.payTime, "text-align:left;", "")),
    (t += "</div>"),
    (t += "</div>"),
    (t += "<div class='order_list_info_status_line'>"),
    (t += "<div class='order_list_info_status_line_label'>"),
    (t += GenerateNormalString("付款金額:", "text-align:right;", "")),
    (t += "</div>"),
    (t += "<div class='order_list_info_status_line_content'>"),
    (t += GenerateNormalString(e.reportInfo.payAmount, "text-align:left;", "")),
    (t += "</div>"),
    (t += "</div>"),
    (t += "<div class='order_list_info_status_line'>"),
    (t += "<div class='order_list_info_status_line_label'>"),
    (t += GenerateNormalString("備註:", "text-align:right;", "")),
    (t += "</div>"),
    (t += "<div class='order_list_info_status_line_content'>"),
    (t += GenerateNormalString(e.reportInfo.note, "text-align:left;", "")),
    (t += "</div>"),
    (t += "</div>");
  for (var a = 0; a < e.buyList.length; a++)
    (t += "<div class='order_list_info_detail_list'>"),
      (t += "<div class='order_list_info_detail_list_label'>"),
      (t += GenerateNormalString("課程ID:", "", "")),
      (t += "</div>"),
      (t += "<div class='order_list_info_detail_list_id'>"),
      (t += GenerateNormalString(GetClassName(e.buyList[a].course_id), "", "")),
      (t += "</div>"),
      (t += "<div class='order_list_info_detail_list_label'>"),
      (t += GenerateNormalString("課程期間:", "", "")),
      (t += "</div>"),
      (t += "<div class='order_list_info_detail_list_duration'>"),
      (t += GenerateNormalString(e.buyList[a].duration / 86400 + " 天", "", "")),
      (t += "</div>"),
      (t += "<div class='order_list_info_detail_list_label'>"),
      (t += GenerateNormalString("課程價格:", "", "")),
      (t += "</div>"),
      (t += "<div class='order_list_info_detail_list_price'>"),
      (t += GenerateNormalString(e.buyList[a].price, "", "")),
      (t += "</div>"),
      (t += "</div>");
  return (t += "</div>");
}
function GetOrderStatus(e) {
  var t = "";
  return 1 == (e = parseInt(e)) ? (t = "已下訂，尚未回報") : 2 == e ? (t = "已回報，尚未確認") : 3 == e ? (t = " 已確認，訂單流程完畢") : 4 == e && (t = "訂單關閉"), t;
}
function GenerateUser() {
  var e = "";
  return (
    (e += GenerateClassInfo("user_id", "會員ID", "", "user_id")),
    (e += GenerateClassInfo("user_name", "會員名字", "", "user_name")),
    (e += GenerateClassButtonLine("user")),
    (e += "<div class='member_list'></div>")
  );
}
function UpdateMemberList() {
  $(".member_list").empty();
  for (var e = "", t = 0; t < gAllUser.length; t++) e += GenerateMemberBlock(gAllUser[t]);
  $(".member_list").append(e);
}
function GenerateMemberBlock(e) {
  var t = "";
  return (
    (t += "<div id='scroll_parent_" + e.id + "' class='member_list_info'>"),
    (t += "<div class='member_list_info_status'>"),
    (t += "<div class='member_list_info_status_line'>"),
    (t += "<div class='member_list_info_status_label'>"),
    (t += GenerateNormalString("會員ID:", "text-align:left;", "")),
    (t += "</div>"),
    (t += "<div class='member_list_info_status_content'>"),
    (t += GenerateNormalString(e.id, "text-align:left;", "")),
    (t += "</div>"),
    (t += "</div>"),
    (t += "<div class='member_list_info_status_line'>"),
    (t += "<div class='member_list_info_status_label'>"),
    (t += GenerateNormalString("會員名字:", "text-align:left;", "")),
    (t += "</div>"),
    (t += "<div class='member_list_info_status_content'>"),
    (t += GenerateNormalString(e.name, "text-align:left;", "")),
    (t += "</div>"),
    (t += "</div>"),
    (t += "</div>"),
    (t += "<div class='member_list_info_button' onclick='ShowScrollDetail(\"" + e.id + "\")'>"),
    (t += GenerateNormalString("+", "", "")),
    (t += "</div>"),
    (t += "</div>"),
    (t += GenerateUserDetail(e))
  );
}
function GenerateUserDetail(e) {
  var t = "";
  return (
    (t += "<div id='scroll_detail_" + e.id + "' class='member_list_info_detail'>"),
    (t += "<div class='member_list_info_detail_line'>"),
    (t += "<div class='member_list_info_detail_line_label'>"),
    (t += GenerateNormalString("E-Mail:", "text-align:left;", "")),
    (t += "</div>"),
    (t += "<div class='member_list_info_detail_line_content'>"),
    (t += GenerateNormalString("", "text-align:left;", "user_" + e.id + "_email")),
    (t += "</div>"),
    (t += "<div class='member_list_info_detail_line_label'>"),
    (t += GenerateNormalString("電話:", "text-align:left;", "")),
    (t += "</div>"),
    (t += "<div class='member_list_info_detail_line_content'>"),
    (t += GenerateNormalString("", "text-align:left;", "user_" + e.id + "_phone")),
    (t += "</div>"),
    (t += "</div>"),
    1 == e.isActive
      ? ((t += "<div id='user_" + e.id + "_admin' class='member_list_info_detail_button' onclick='CloseUser(\"" + e.id + '","' + e.name + "\")'>"),
        (t += GenerateNormalString("關閉會員", "font-size:40px", "user_" + e.id + "_active")))
      : ((t += "<div id='user_" + e.id + "_admin' class='member_list_info_detail_button' onclick='OpenUser(\"" + e.id + '","' + e.name + "\")'>"),
        (t += GenerateNormalString("啟用會員", "font-size:40px", "user_" + e.id + "_active"))),
    (t += "</div>"),
    (t += "</div>")
  );
}
function UpdateUserInfo(e, t) {
  $("#user_" + t + "_email").html(e.userData.email),
    $("#user_" + t + "_phone").html(e.userData.phone),
    1 == e.userData.isUserAdmin ? $("#user_" + t + "_admin").hide() : $("#user_" + t + "_admin").show();
}
function ChangeContent(e) {
  if (PAGE_MENUS[e] == "外拍活動管理") {
    GetAllActivity();
    gPageIndex = e;
    $("#header_id").html(PAGE_MENUS[e]);
    $("#content_body").empty();
  } else if (PAGE_MENUS[e] == "線下課程管理") {
    GetAllMember();
    GetAllRealClass();
    gPageIndex = e;
    $("#header_id").html(PAGE_MENUS[e]);
    $("#content_body").empty();
  } else if (PAGE_MENUS[e] == "課程相關管理") {
    GetAllClass();
    gPageIndex = e;
    $("#header_id").html(PAGE_MENUS[e]);
    $("#content_body").empty();
  } else if (PAGE_MENUS[e] == "實體課程轉換") {
    GetAllRealClass();
    gPageIndex = e;
    $("#header_id").html(PAGE_MENUS[e]);
    $("#content_body").empty();
  } else if (PAGE_MENUS[e] == "訂單管理") {
    GetAllClass();
    $("#content_body").empty().append(GenerateOrder());
    gPageIndex = e;
    $("#header_id").html(PAGE_MENUS[e]);
    $("#content_body").empty();
  } else if (PAGE_MENUS[e] == "會員管理") {
    GetAllMember();
    $("#content_body").empty().append(GenerateUser());
    gPageIndex = e;
    $("#header_id").html(PAGE_MENUS[e]);
    $("#content_body").empty();
  } else if (PAGE_MENUS[e] == "Vimeo影片空間") {
    window.open("https://vimeo.com/");
  } else if (PAGE_MENUS[e] == "Mega檔案空間") {
    window.open("https://mega.nz/");
  } else if (PAGE_MENUS[e] == "回到首頁") {
    window.location.assign("../index.htm");
  }
}
function ShowScrollDetail(e) {
  var t = $("#scroll_parent_" + e),
    a = $("#scroll_detail_" + e);
  a.is(":hidden")
    ? (t.removeClass("class_info").addClass("class_info_exapnd"),
      a.show(),
      0 == gPageIndex
        ? GetClassMember(e)
        : 1 == gPageIndex
        ? 0 != e.length
          ? GetClassContent(e)
          : ((gAllClasses[0].attachFiles = new Array()),
            (gAllClasses[0].chapters = new Array()),
            (gAllModifyClasses = $.parseJSON(JSON.stringify(gAllClasses))),
            UpdateAllClassContent(e),
            ChangeAddClass())
        : 4 == gPageIndex && GetUserInfo(e))
    : (t.removeClass("class_info_exapnd").addClass("class_info"), a.hide());
}
function ReadURL(e, a, i) {
  if (e.files && e.files[0]) {
    var t = new FileReader();
    (t.onload = function (e) {
      if (null == i) {
        var t = "";
        t += "<img class='fill_parent' src='" + e.target.result + "'>";
        if (PAGE_MENUS[gPageIndex] == "外拍活動管理") {
          $("#activity_detail_mainImg_" + a).attr("src", e.target.result);
          AddActivityMainImage(a);
        } else {
          $("#class_" + a + "_add_image")
            .empty()
            .append(t);
          ConfirmAddImage(a);
        }
      } else {
        if (PAGE_MENUS[gPageIndex] == "外拍活動管理") {
          $("#activity_detail_subImage_" + a + "_" + i)
            .attr("src", e.target.result)
            .show();
          if (i == 0) {
            $("#activity_detail_subImage_hint_" + a + "_" + i).hide();
          }
        } else {
          $("#class_" + a + "_image_" + i).attr("src", e.target.result), ConfirmChangeImage(a, i);
        }
      }
    }),
      t.readAsDataURL(e.files[0]);
  }
}
function CloseClass(e) {
  confirm("確認要關閉課程?") && DisabledClass(e);
}
function OpenClass(e) {
  var course = GetClassFromID(e);
  if (course.courseType != 2) {
    if (course.specs.length == 0) {
      alert("請設定規格");
      return;
    }
  }
  confirm("確認要開啟課程?") && EnabledClass(e);
}
function SaveClass(e, t) {
  var a = $.parseJSON(JSON.stringify(GetClassFromID(e)));
  null == a.attachFiles && (a.attachFiles = new Array()), null == a.specs && (a.specs = new Array()), null == a.pics && (a.pics = new Array()), (a.is_active = t ? 2 : 1);
  //表示沒改過
  if (a.is_chargeable == null) {
    if (a.isFree == null || a.isFree == 0) {
      a.is_chargeable = 1;
    } else {
      a.is_chargeable = 0;
    }
  }
  if (a.courseType != 2) {
    if (a.is_active == 1) {
      if (a.specs.length == 0) {
        alert("請設定規格");
        return;
      }
    }
  }
  0 != e.length ? ((a.course_type = a.courseType), delete a.courseType, (a.action = "modify"), SetClass(e, a)) : ((a.course_type = a.courseType), delete a.courseType, SetNewClass(a));
}
function ChangeAddClass() {
  (gAllModifyClasses[0].courseType = parseInt($("#add_class_type").val())),
    1 == $("#add_class_type").val()
      ? ($("#spec_block").show(), $("#temp_save").css("visibility", "visible"), $("#start_time").css("visibility", "hidden"), $("#end_time").css("visibility", "hidden"), $("#class_line_link").show())
      : ($("#spec_block").hide(),
        $("#temp_save").css("visibility", "hidden"),
        $("#start_time").css("visibility", "visible"),
        $("#end_time").css("visibility", "visible"),
        $("#class_line_link").hide());
}
function RemoveUser(e, t) {
  gNotInClassUser[e].push(gClassUser[e][t]), gClassUser[e].splice(t, 1), UpdateUser(e);
}
function AddUser(e, t) {
  gClassUser[e].push(gNotInClassUser[e][t]), gNotInClassUser[e].splice(t, 1), UpdateUser(e);
}
function SaveUser(e) {
  gAlertCount = 0;
  for (var t = new Array(), a = 0; a < gClassUser[e].length; a++) {
    for (var i = !1, l = 0; l < gModifyClassUser[e].length; l++) gClassUser[e][a].id == gModifyClassUser[e][l].id && (i = !0);
    i || t.push(gClassUser[e][a].id);
  }
  0 != t.length && (SetMember(e, t, "add"), gAlertCount++), (t = new Array());
  for (a = 0; a < gNotInClassUser[e].length; a++) {
    for (i = !1, l = 0; l < gModifyNotInClassUser[e].length; l++) gNotInClassUser[e][a].id == gModifyNotInClassUser[e][l].id && (i = !0);
    i || t.push(gNotInClassUser[e][a].id);
  }
  0 != t.length && (SetMember(e, t, "remove"), gAlertCount++);
}
function SearchOrder(e) {
  var t = "";
  0 != (t = "id" == e ? $("#class_id_id").val() : $("#class_ref_id_ref_id").val()).length && GetOrder(e, t);
}
function CheckOrder(e) {
  if ($("#order_" + e).is(":checked")) gCheckOrderList.push(e);
  else for (var t = 0; t < gCheckOrderList.length; t++) gCheckOrderList[t] == e && (gCheckOrderList.splice(t, 1), (t = -1));
}
function CheckRealClass(e) {
  if ($("#real_class_checkbox_" + e).is(":checked")) gCheckClassList.push(e);
  else for (var t = 0; t < gCheckClassList.length; t++) gCheckClassList[t] == e && (gCheckClassList.splice(t, 1), (t = -1));
}
function SaveOrder() {
  0 != gCheckOrderList.length && SetSaveOrder(gCheckOrderList);
}
function SaveRealClassList() {
  if (0 != gCheckClassList.length) {
    for (var e = new Array(), t = 0; t < gCheckClassList.length; t++) {
      var a = new Object();
      a.id = gCheckClassList[t];
      for (var i = new Array(), l = 0; l < $("." + a.id + "_checkbox_duration").length; l++) {
        var s = new Object(),
          n = $($("." + a.id + "_checkbox_duration")[l]).val(),
          _ = parseInt($($("." + a.id + "_checkbox_price")[l]).val());
        (n = parseInt(n.split(" ")[0])), (s.price = _), (s.duration = 3600 * n * 24), i.push(s);
      }
      (a.specs = i), 0 != a.specs.length && e.push(a);
    }
    if (0 != e.length) {
      var r = new Object();
      (r.course_list = e), SetSaveRealClass(JSON.stringify(r));
    }
  }
}
function CloseUser(e, t) {
  confirm("確認要關閉會員 " + e + "(" + t + ")?") && SetCloseUser(e);
}
function OpenUser(e, t) {
  confirm("確認要啟用會員 " + e + "(" + t + ")?") && SetOpenUser(e);
}
function SearchUser(e) {
  var t = "";
  if (0 != (t = "user_id" == e ? $("#class_user_id_user_id").val() : $("#class_user_name_user_name").val()).length) {
    var a = new Array(),
      i = new RegExp(t, "g");
    if ("user_id" == e) for (var l = 0; l < gOrigianlAllUser.length; l++) null != gOrigianlAllUser[l].id.match(i) && a.push(gOrigianlAllUser[l]);
    else for (l = 0; l < gOrigianlAllUser.length; l++) null != gOrigianlAllUser[l].name.match(i) && a.push(gOrigianlAllUser[l]);
    (gAllUser = a), UpdateMemberList();
  }
}
function CheckboxAddDurationPrice(e) {
  var t = $("#checkbox_" + e + "_add_day").val(),
    a = $("#checkbox_" + e + "_add_price").val();
  if (0 == a.length || a < 0) alert("請輸入正確價格");
  else {
    for (var i = !1, l = 0; l < $("." + e + "_checkbox_duration").length; l++) {
      t + " 天" == $($("." + e + "_checkbox_duration")[l]).val() && (i = !0);
    }
    if (!i) {
      var s = "";
      (s += "<div id='checkbox_detail_spec_" + e + "' class='checkbox_line_detatil'>"),
        (s += "<div class='checkbox_line_detatil_label'>"),
        (s += GenerateNormalString("時間", "", "")),
        (s += "</div>"),
        (s += "<input type='text' class='checkbox_line_detatil_label " + e + "_checkbox_duration' value='" + t + " 天' disabled>"),
        (s += "<div class='checkbox_line_detatil_label'>"),
        (s += GenerateNormalString("價格:", "", "")),
        (s += "</div>"),
        (s += "<input type='text' class='checkbox_line_detatil_label " + e + "_checkbox_price' value='" + a + "' disabled>"),
        (s += "<div class='checkbox_line_detatil_label' onclick='DeleteCheckboxSpec(\"" + e + "\")'>"),
        (s += GenerateNormalString("X", "color:#F00", "")),
        (s += "</div>"),
        (s += "</div>"),
        $("#checkbox_detail_" + e).append(s);
    }
  }
}
function DeleteCheckboxSpec(e) {
  $("#checkbox_detail_spec_" + e).remove();
}
function ConfirmFree(e) {
  for (var i = 0; i < gAllModifyClasses.length; i++) {
    if (gAllModifyClasses[i].id == e) {
      var isFree = $("#class_" + gAllModifyClasses[i].id + "_free").val();
      if (isFree == 0) {
        gAllModifyClasses[i].is_chargeable = 1;
      } else {
        gAllModifyClasses[i].is_chargeable = 0;
      }
    }
  }
}
function ConfirmName(e) {
  for (var t = $("#class_" + e + "_name").val(), a = 0; a < gAllModifyClasses.length; a++) gAllModifyClasses[a].id == e && (gAllModifyClasses[a].name = t);
}
function ConfirmDesciption(e) {
  for (var t = $("#class_" + e + "_description").val(), a = 0; a < gAllModifyClasses.length; a++) gAllModifyClasses[a].id == e && (gAllModifyClasses[a].description = t);
}
function ConfirmLink(e) {
  for (var t = $("#class_" + e + "_link").val(), a = 0; a < gAllModifyClasses.length; a++)
    gAllModifyClasses[a].id == e && (null == gAllModifyClasses[a].ext_data && (gAllModifyClasses[a].ext_data = new Object()), (gAllModifyClasses[a].ext_data.intro_video = t));
}
function ConfirmAddImage(e) {
  var t = $("#class_" + e + "_add_image_file")[0].files[0];
  null != t ? UploadImage("thumb", t, e) : alert("請上傳照片");
}
function ConfirmDeleteImage(e, t) {
  if (confirm("確定刪除這張圖片嗎? 點下確認後圖片將會立即刪除?")) {
    for (var a = 0; a < gAllModifyClasses.length; a++) gAllModifyClasses[a].id == e && gAllModifyClasses[a].pics.splice(t, 1);
    UpdateImage(e);
  }
}
function ConfirmChangeImage(e, t) {
  var a = $("#class_" + e + "_" + t + "_image_file")[0].files[0];
  null != a ? UploadImage("thumb", a, e) : alert("請上傳照片");
}
function ConfirmAddSpec(e) {
  var t = 86400 * $("#class_" + e + "_add_day").val(),
    a = $("#class_" + e + "_add_price").val();
  if (0 == a.length) alert("請輸入正確數字");
  else {
    for (var i = 0; i < gAllModifyClasses.length; i++)
      if (gAllModifyClasses[i].id == e) {
        var l = !1;
        null == gAllModifyClasses[i].specs && (gAllModifyClasses[i].specs = new Array());
        for (var s = 0; s < gAllModifyClasses[i].specs.length; s++) gAllModifyClasses[i].specs[s].duration == t && ((gAllModifyClasses[i].specs[s].price = a), (l = !0));
        if (!l) {
          var n = new Object();
          (n.price = a), (n.duration = t), gAllModifyClasses[i].specs.push(n);
        }
      }
    UpdateSpec(e);
  }
}
function ConfirmChangeDuration(e, t, a) {
  "spec_info" == e ? ConfirmSpec(a, t) : "chapter_info" == e && ConfirmChapter(a, t);
}
function ConfirmSpec(e, t) {
  var a = 86400 * $("#class_" + e + "_" + t + "_day").val(),
    i = $("#class_" + e + "_" + t + "_price").val();
  0 == i.length && ((i = 0), $("#class_" + e + "_" + t + "_price").val(0));
  for (var l = 0; l < gAllModifyClasses.length; l++) gAllModifyClasses[l].id == e && ((gAllModifyClasses[l].specs[t].duration = a), (gAllModifyClasses[l].specs[t].price = i));
}
function ConfirmDeleteSpec(e, t) {
  for (var a = 0; a < gAllModifyClasses.length; a++) gAllModifyClasses[a].id == e && gAllModifyClasses[a].specs.splice(t, 1);
  UpdateSpec(e);
}
function ConfirmAddChapter(e) {
  var t = $("#class_" + e + "_add_chapter_name").val(),
    a = $("#class_" + e + "_add_chapter_description").val(),
    i = $("#class_" + e + "_add_chapter_link").val(),
    l = new Date($("#class_" + e + "_add_chapter_start_time").val()).getTime() / 1e3 - 28800,
    s = new Date($("#class_" + e + "_add_chapter_end_time").val()).getTime() / 1e3 - 28800 - 60 + 86400;
  if (0 != t.length)
    if (0 != a.length)
      if (0 != i.length)
        if (s - l < 86340) alert("時間不能小於一天");
        else {
          i = "https://player.vimeo.com/video/" + i;
          for (var n = 0; n < gAllModifyClasses.length; n++)
            if (gAllModifyClasses[n].id == e) {
              if (0 == gAllModifyClasses[n].id.length) 2 == $("#add_class_type").val() && !0;
              else 2 == gAllModifyClasses[n].courseType && !0;
              var _ = !1;
              null == gAllModifyClasses[n].chapters && (gAllModifyClasses[n].chapters = new Array());
              for (var r = 0; r < gAllModifyClasses[n].chapters.length; r++)
                gAllModifyClasses[n].chapters[r].chapNo == t &&
                  ((gAllModifyClasses[n].chapters[r].description = a),
                  (gAllModifyClasses[n].chapters[r].link = i),
                  (gAllModifyClasses[n].chapters[r].startTime = l),
                  (gAllModifyClasses[n].chapters[r].expireTime = s),
                  (_ = !0));
              if (!_) {
                var c = new Object();
                (c.chapNo = t), (c.description = a), (c.link = i), (c.startTime = l), (c.expireTime = s), (c.attachFile_map = new Array()), gAllModifyClasses[n].chapters.push(c);
              }
            }
          var d = GetClassFromID(e);
          UpdateChapter(d), UpdateBelongChapter(d);
        }
      else alert("路徑不能為空");
    else alert("描述不能為空");
  else alert("名字不能為空");
}
function ConfirmChapter(e, t) {
  var a = $("#class_" + e + "_" + t + "_chapter_name").val(),
    i = $("#class_" + e + "_" + t + "_chapter_description").val(),
    l = $("#class_" + e + "_" + t + "_chapter_link").val(),
    s = new Date($("#class_" + e + "_" + t + "_chapter_start_time").val()).getTime() / 1e3 - 28800,
    n = new Date($("#class_" + e + "_" + t + "_chapter_end_time").val()).getTime() / 1e3 - 28800 - 60 + 86400;
  if (0 != i.length)
    if (0 != l.length) {
      if (n - s < 86340) {
        var _ = GetValidTime(new Date().getTime() / 1e3, !1)
          .split(" ")[0]
          .split("/");
        _ = _[0] + "-" + _[1] + "-" + _[2];
        var r = GetValidTime(new Date().getTime() / 1e3 + 86400, !1)
          .split(" ")[0]
          .split("/");
        (r = r[0] + "-" + r[1] + "-" + r[2]),
          $("#class_" + e + "_chapter_start_time").val(_),
          $("#class_" + e + "_chapter_end_time").val(r),
          alert("時間不能小於一天"),
          (s = new Date(_).getTime() / 1e3 - 28800),
          (n = new Date(r).getTime() / 1e3 - 28800 - 60 + 86400);
      }
      l = "https://player.vimeo.com/video/" + l;
      for (var c = 0; c < gAllModifyClasses.length; c++)
        if (gAllModifyClasses[c].id == e)
          for (var d = 0; d < gAllModifyClasses[c].chapters.length; d++)
            gAllModifyClasses[c].chapters[d].chapNo == a &&
              ((gAllModifyClasses[c].chapters[d].description = i),
              (gAllModifyClasses[c].chapters[d].link = l),
              (gAllModifyClasses[c].chapters[d].startTime = s),
              (gAllModifyClasses[c].chapters[d].expireTime = n));
      UpdateChapter(GetClassFromID(e));
    } else alert("路徑不能為空");
  else alert("描述不能為空");
}
function ConfirmDeleteChapter(e, t) {
  for (var a = 0; a < gAllModifyClasses.length; a++) gAllModifyClasses[a].id == e && gAllModifyClasses[a].chapters.splice(t, 1);
  var i = GetClassFromID(e);
  UpdateChapter(i), UpdateBelongChapter(i);
}
function ConfirmAddAttatch(e) {
  var t = $("#class_" + e + "_add_attach_name").val(),
    a = $("#class_" + e + "_add_attach_link").val(),
    i = $("#class_" + e + "_add_attach_chapter").val();
  if (0 != t.length)
    if (0 != a.length) {
      for (var l = 0; l < gAllModifyClasses.length; l++)
        if (gAllModifyClasses[l].id == e) {
          var s = !1;
          null == gAllModifyClasses[l].attachFiles && (gAllModifyClasses[l].attachFiles = new Array());
          for (var n = 0; n < gAllModifyClasses[l].attachFiles.length; n++) gAllModifyClasses[l].attachFiles[n].name == t && ((gAllModifyClasses[l].attachFiles[n].path = a), (s = !0));
          if (!s) {
            var _ = new Object();
            (_.name = t), (_.path = a), gAllModifyClasses[l].attachFiles.push(_);
          }
          if (-1 != i) {
            var r = !1;
            for (n = 0; n < gAllModifyClasses[l].chapters[i].attachFile_map.length; n++) gAllModifyClasses[l].chapters[i].attachFile_map[n] == t && (r = !0);
            r || gAllModifyClasses[l].chapters[i].attachFile_map.push(t);
          }
        }
      var c = GetClassFromID(e);
      UpdateAttach(c), UpdateBelongChapter(c);
    } else alert("路徑不能為空");
  else alert("名稱不能為空");
}
function ConfirmAttatch(e, t) {
  for (
    var a = $("#class_" + e + "_" + t + "_attach_name").val(), i = $("#class_" + e + "_" + t + "_attach_link").val(), l = $("#class_" + e + "_" + t + "_attach_chapter").val(), s = 0;
    s < gAllModifyClasses.length;
    s++
  )
    if (gAllModifyClasses[s].id == e) {
      for (var n = 0; n < gAllModifyClasses[s].attachFiles.length; n++) gAllModifyClasses[s].attachFiles[n].name == a && (gAllModifyClasses[s].attachFiles[n].path = i);
      DeleteAttachName(gAllModifyClasses[s], a), AddAttachName(gAllModifyClasses[s], l, a);
    }
  var _ = GetClassFromID(e);
  UpdateAttach(_), UpdateBelongChapter(_);
}
function ConfirmDeleteAttatch(e, t) {
  for (var a = 0; a < gAllModifyClasses.length; a++)
    gAllModifyClasses[a].id == e && (DeleteAttachName(gAllModifyClasses[a], gAllModifyClasses[a].attachFiles[t].name), gAllModifyClasses[a].attachFiles.splice(t, 1));
  var i = GetClassFromID(e);
  UpdateAttach(i), UpdateBelongChapter(i);
}
function UpdateActivity() {
  $("#content_body").empty();
  var res = "";
  for (var i = 0; i < gActivityList.length; i++) {
    res += GenerateActivityBlock(i, gActivityList[i].name);
  }
  $("#content_body").append(res);
}
function GenerateActivityBlock(index, text) {
  var res = "";
  res += "<div id='activity_block_" + index + "' class='activity_block' onclick='GetActivityDetail(" + index + ")'>";
  res += GenerateNormalString(text, "font-size: 20px");
  res += "</div>";
  return res;
}
function GenerateActivityDetail(index) {
  console.log(gActivityList[index].content);
  var res = "";
  res += "<div class='activity_detail' id='activity_detail_" + index + "'>";
  res += "<div class='activity_detail_line'>";
  res += "<div class='activity_detail_line_label'>";
  res += GenerateNormalString("名字:", "font-size: 20px;");
  res += "</div>";
  res +=
    "<input type='text' id='activity_detail_name_" +
    index +
    "' class='activity_detail_line_input' value='" +
    gActivityList[index].content.name +
    '\' onchange=\'ChangeDetailValue("activity_detail_name_","' +
    index +
    "\")'></input>";
  res += "</div>";
  res += "<div class='activity_detail_line'>";
  res += "<div class='activity_detail_line_label'>";
  res += GenerateNormalString("活動內容:", "font-size: 20px;");
  res += "</div>";
  res +=
    "<textarea type='text' id='activity_detail_description_" +
    index +
    "' class='activity_detail_line_input' value='" +
    gActivityList[index].content.description +
    '\' onkeyup=\'ChangeDetailValue("activity_detail_description_","' +
    index +
    "\")'></textarea>";
  res += "</div>";
  res += "<div class='activity_detail_line'>";
  res += "<div class='activity_detail_line_label'>";
  res += GenerateNormalString("開始時間:", "font-size: 20px;");
  res += "</div>";
  res +=
    "<input onkeydown='return false' type='date' id='activity_detail_startTime_" +
    index +
    "' class='activity_detail_line_input' value='" +
    ChangeTimestampToDate(gActivityList[index].content.startTime) +
    '\' onchange=\'ChangeDetailValue("activity_detail_startTime_","' +
    index +
    "\")'></input>";
  res += "</div>";
  res += "<div class='activity_detail_line'>";
  res += "<div class='activity_detail_line_label'>";
  res += GenerateNormalString("結束時間:", "font-size: 20px;");
  res += "</div>";
  res +=
    "<input onkeydown='return false' type='date' id='activity_detail_endTime_" +
    index +
    "' class='activity_detail_line_input'  value='" +
    ChangeTimestampToDate(gActivityList[index].content.endTime) +
    '\' onchange=\'ChangeDetailValue("activity_detail_endTime_","' +
    index +
    "\")'></textarea>";
  res += "</div>";
  res += "<div class='activity_detail_line'>";
  res += "<div class='activity_detail_line_label'>";
  res += GenerateNormalString("啟動:", "font-size: 20px;");
  res += "</div>";
  res += "<div class='activity_detail_line_input'>";
  res += gActivityList[index].content.isActive == 1 ? GenerateNormalString("啟用中", "font-size: 20px;text-align:left") : GenerateNormalString("已關閉", "font-size: 20px;text-align:left");
  res += "</div>";
  res += "</div>";
  res += "<div class='activity_detail_line'>";
  res += "<div class='activity_detail_line_label'>";
  res += GenerateNormalString("連結:", "font-size: 20px;");
  res += "</div>";
  res +=
    "<input type='text' id='activity_detail_link_" +
    index +
    "' class='activity_detail_line_input' value='" +
    gActivityList[index].content.data.link +
    '\' onchange=\'ChangeDetailValue("activity_detail_link_","' +
    index +
    "\")'></input>";
  res += "</div>";
  res += "<div class='activity_detail_line'>";
  res += "<div class='activity_detail_line_label'>";
  res += GenerateNormalString("主圖:", "font-size: 20px;");
  res += "</div>";
  res += "<div class='activity_detail_line_img_block'>";
  res += "<label class='activity_detail_line_img'>";
  if (gActivityList[index].content.data.mainImg.length == 0) {
    res += "<div class='activity_detail_line_img_no'>";
    res += GenerateNormalString("選擇圖片", "font-size: 20px;");
    res += "</div>";
  } else {
    res += "<img id='activity_detail_mainImage_" + index + "' class='fill_parent' src='" + gActivityList[index].content.data.mainImg + "'></img>";
  }
  res += "<input id='activity_detail_mainImage_file_" + index + "' style='display:none;' type='file' onchange='ReadURL(this,\"" + index + "\")' accept='image/*'>";
  res += "</label>";
  res += "</div>";
  res += "</div>";
  res += "<div class='activity_detail_line'>";
  res += "<div class='activity_detail_line_label'>";
  res += GenerateNormalString("子圖:", "font-size: 20px;");
  res += "</div>";
  res += "<div class='activity_detail_line_img_block'>";
  for (var i = 0; i < gActivityList[index].content.data.imgs.length; i++) {
    res += "<div id='activity_detail_subImage_block_" + index + "_" + i + "' class='activity_detail_line_img_block_button'>";
    res += "<label class='activity_detail_line_img_block_button_top'>";
    if (i == 0) {
      res += "<img id='activity_detail_subImage_" + index + "_" + i + "' class='fill_parent' style='display:none'></img>";
      res += "<div id='activity_detail_subImage_hint_" + index + "_" + i + "' class='activity_detail_line_img_no'>";
      res += GenerateNormalString("選擇圖片", "font-size: 20px;");
      res += "</div>";
    } else {
      res += "<img id='activity_detail_subImage_" + index + "_" + i + "' class='fill_parent' src='" + gActivityList[index].content.data.imgs[i] + "'></img>";
    }
    res += "<input id='activity_detail_subImage_file_" + index + "_" + i + "' style='display:none;' type='file' onchange='ReadURL(this,\"" + index + '", "' + i + "\")' accept='image/*'>";
    res += "</label>";
    res += "<div class='activity_detail_line_img_block_button_bottom'>";
    if (i == 0) {
      res += "<div class='activity_detail_line_img_block_button_bottom_block' style='width: 100%' onclick='AddActivitySubImage(\"" + index + "\", 0)'>";
      res += GenerateNormalString("新增", "font-size: 20px;");
      res += "</div>";
    } else {
      res += "<div class='activity_detail_line_img_block_button_bottom_block' onclick='ForwardActivitySubImage(\"" + index + '", "' + i + "\")'>";
      res += GenerateNormalString("往前", "font-size: 20px;");
      res += "</div>";
      res += "<div class='activity_detail_line_img_block_button_bottom_block' onclick='BackwardActivitySubImage(\"" + index + '", "' + i + "\")'>";
      res += GenerateNormalString("往後", "font-size: 20px;");
      res += "</div>";
      res += "<div class='activity_detail_line_img_block_button_bottom_block' onclick='DeleteActivitySubImage(\"" + index + '", "' + i + "\")'>";
      res += GenerateNormalString("刪除", "font-size: 20px;");
      res += "</div>";
    }
    res += "</div>";
    res += "</div>";
  }
  res += "</div>";
  res += "</div>";
  res += "<div class='activity_detail_bottom'>";
  if (index == 0) {
    res += "<div class='activity_detail_bottom_button' style='margin-left:calc((100% - 200px) / 2);' onClick='CreateEvent(" + index + ");'>";
    res += GenerateNormalString("新增", "font-size: 20px;");
    res += "</div>";
  } else {
    res += "<div class='activity_detail_bottom_button' style='margin-left:calc((100% - 200px * 3) / 4);' onClick='UpdateEvent(" + index + ', "modify");\'>';
    res += GenerateNormalString("修改", "font-size: 20px;");
    res += "</div>";
    res += "<div class='activity_detail_bottom_button' style='margin-left:calc((100% - 200px * 3) / 4);' onClick='UpdateEvent(" + index + ', "activate");\'>';
    res += GenerateNormalString("啟用", "font-size: 20px;");
    res += "</div>";
    res += "<div class='activity_detail_bottom_button' style='margin-left:calc((100% - 200px * 3) / 4);' onClick='UpdateEvent(" + index + ', "remove");\'>';
    res += GenerateNormalString("停用", "font-size: 20px;");
    res += "</div>";
  }
  res += "</div>";
  res += "</div>";
  return res;
}
function UpdateActivityDetail(index) {
  $("#activity_detail_" + index).remove();
  $("#content_body #activity_block_" + index).after(GenerateActivityDetail(index));
  if (gActivityList[index].content.data.imgs.length >= 9) {
    $("#activity_detail_subImage_block_" + index + "_" + 0).hide();
  }
}
function AddActivityMainImage(index) {
  var file = $("#activity_detail_mainImage_file_" + index)[0].files[0];
  if (file != null) {
    UploadImage("thumb", file, index, "activity_detail_mainImage_change");
  } else {
    alert("請上傳照片");
  }
}
function AddActivitySubImage(index, subIndex) {
  var file = $("#activity_detail_subImage_file_" + index + "_" + subIndex)[0].files[0];
  if (file != null) {
    if (subIndex == 0) {
      UploadImage("thumb", file, index, "activity_detail_subImage_add");
    } else {
      UploadImage("thumb", file, index, "activity_detail_subImage_change", subIndex);
    }
  } else {
    alert("請上傳照片");
  }
}
function ForwardActivitySubImage(index, subIndex) {
  var url = gActivityList[index].content.data.imgs[subIndex];
  gActivityList[index].content.data.imgs.splice(subIndex, 1);
  if (subIndex == 1) {
    gActivityList[index].content.data.imgs.push(url);
  } else {
    gActivityList[index].content.data.imgs.splice(subIndex - 1, 0, url);
  }
  UpdateActivityDetail(index);
}
function BackwardActivitySubImage(index, subIndex) {
  subIndex = parseInt(subIndex);
  var url = gActivityList[index].content.data.imgs[subIndex];
  gActivityList[index].content.data.imgs.splice(subIndex, 1);
  if (subIndex == gActivityList[index].content.data.imgs.length) {
    gActivityList[index].content.data.imgs.splice(1, 0, url);
  } else {
    gActivityList[index].content.data.imgs.splice(subIndex + 1, 0, url);
  }
  UpdateActivityDetail(index);
}
function DeleteActivitySubImage(index, subIndex) {
  gActivityList[index].content.data.imgs.splice(subIndex, 1);
  UpdateActivityDetail(index);
}
function ChangeTimestampToDate(timestamp) {
  return new Date(timestamp * 1000).toISOString().split("T")[0];
}
function CreateEvent(index) {
  if (CheckEvent(index)) {
    RemoveDetailDefaultValue(index);
    SendCreateEvent(index);
  }
}
function RemoveDetailDefaultValue(index) {
  if (gActivityList[index].content.data.imgs[0] == "") {
    gActivityList[index].content.data.imgs.splice(0, 1);
  }
}
function ChangeDetailValue(id, index) {
  if (id == "activity_detail_name_") {
    gActivityList[index].content.name = $("#" + id + index).val();
  }
  if (id == "activity_detail_description_") {
    gActivityList[index].content.description = ($("#" + id + index).val()).replace(/\n/g,"<br>");
  }
  if (id == "activity_detail_startTime_") {
    gActivityList[index].content.startTime = new Date($("#" + id + index).val()).getTime() / 1000;
  }
  if (id == "activity_detail_endTime_") {
    gActivityList[index].content.endTime = new Date($("#" + id + index).val()).getTime() / 1000;
  }
  if (id == "activity_detail_link_") {
    gActivityList[index].content.data.link = $("#" + id + index).val();
  }
}
function CheckEvent(index) {
  var isValid = true;
  if (gActivityList[index].content.name.length == 0) {
    alert("請輸入名字");
    isValid = false;
  }
  if (gActivityList[index].content.endTime - gActivityList[index].content.startTime <= 0) {
    alert("時間錯誤");
    isValid = false;
  }
  return isValid;
}
function UpdateEvent(index, action) {
  if (CheckEvent(index)) {
    RemoveDetailDefaultValue(index);
    gActivityList[index].content.action = action;
    SendUpdateEvent(index);
  }
}
