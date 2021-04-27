var isForgetPassword = !1;
function GenerateTitleString(e, t, r) {
  var n = "";
  return (
    (n += "<table>"),
    (n +=
      "<td id='" +
      r +
      "' class='title_string' style='" +
      t +
      "'>" +
      e +
      "</td>"),
    (n += "</table>")
  );
}
function GenerateNormalString(e, t, r, n) {
  var l = "";
  return (
    (l += "<table>"),
    (l +=
      "true" == n
        ? "<td id='" +
          r +
          "' class='normal_string' style='" +
          t +
          "'><span class='need_red'>*</span>" +
          e +
          "</td>"
        : "<td id='" +
          r +
          "' class='normal_string' style='" +
          t +
          "'>" +
          e +
          "</td>"),
    (l += "</table>")
  );
}
function GenerateRandomBackground() {
  return (
    "rgba(" +
    Math.floor(255 * Math.random()) +
    "," +
    Math.floor(255 * Math.random()) +
    "," +
    Math.floor(255 * Math.random()) +
    ",0.5)"
  );
}
function SetDefaultAlerMenu() {
  (screen_height =
    $(".border").height() +
    $(".header").height() +
    $(".main_information").height() +
    $(".main_class").height()),
    $(".alert_menu").show().empty();
}
function GetValidTime(e, t) {
  var r = "";
  if (null != e)
    if (t) {
      GetPlusZeroValue(parseInt(e / 60 / 60 / 24, 10)),
        GetPlusZeroValue(parseInt((e / 60 / 60) % 24, 10)),
        GetPlusZeroValue(parseInt((e / 60) % 60, 10));
      r = parseInt(e / 60 / 60 / 24, 10) + "天";
    } else {
      var n = new Date(1e3 * e),
        l = n.getFullYear(),
        o = [
          "01",
          "02",
          "03",
          "04",
          "05",
          "06",
          "07",
          "08",
          "09",
          "10",
          "11",
          "12",
        ][n.getMonth()],
        a = GetPlusZeroValue(n.getDate()),
        _ = GetPlusZeroValue(n.getHours()),
        i = GetPlusZeroValue(n.getMinutes()),
        c =
          (GetPlusZeroValue(n.getSeconds()),
          (-1 * new Date().getTimezoneOffset()) / 60),
        s = "-";
      0 <= c && (s = "+"),
        (r = l + "/" + o + "/" + a + " " + _ + ":" + i + " (GMT" + s + c + ")");
    }
  return r;
}
function GetPlusZeroValue(e) {
  return e < 10 && (e = "0" + e), e;
}
function GenerateBorder() {
  return "<div class='border'>", "</div>", "<div class='border'></div>";
}
function GenerateEmptyBorder() {
  return (
    "<div class='white_border'>", "</div>", "<div class='white_border'></div>"
  );
}
function GenerateHeader(e) {
  var t = new Array(),
    r = "";
  e == PAGE_INDEX
    ? ((r = "朱智青老師影像"),
      t.push("管理者介面?ChangeToAdminPage()?admin_page"),
      t.push("購物車?ShowShoppingCar()?shopping_car_button"),
      t.push("會員中心?ChangeToMemberPage()?member_button"))
    : ((r = "會員中心"), t.push("課程內容?ChangeToClassPage()?index_button")),
    t.push("登入?ShowLoginMenu()?login_button");
  var n = "";
  (n += "<div class='header'>"),
    (n += "<div class='header_block'>"),
    (n +=
      "<div class='header_title' style='width:calc((100% - 3px * " +
      (t.length + 3) +
      ") - 100px * " +
      t.length +
      ");'>"),
    (n += GenerateTitleString(
      r,
      "font-size: 30px;font-weight:bold;letter-spacing:5"
    )),
    (n += "</div>");
  for (var l = 0; l < t.length; l++)
    "管理者介面" == t[l].split("?")[0]
      ? (n +=
          "<div id='" +
          t[l].split("?")[2] +
          "' class='header_menu' onclick='" +
          t[l].split("?")[1] +
          "' style='visibility:hidden'>")
      : (n +=
          "<div class='header_menu' onclick='" + t[l].split("?")[1] + "' >"),
      (n += GenerateNormalString(
        t[l].split("?")[0],
        "text-align:center;" + button_ok_color,
        t[l].split("?")[2]
      )),
      (n += "</div>");
  return (n += "</div>"), (n += "</div>");
}
function UpdateLoginInformation() {
  0 != gToken.length
    ? ($("#login_button").html(gAccount + "(登出)"),
      $("#shopping_car_button").show(),
      $("#member_button").show(),
      $("#login_button_position").css("margin-left", "3px"))
    : gCurrentPage == PAGE_MEMBER
    ? window.location.assign("./index.htm")
    : ($("#shopping_car_button").hide(), $("#member_button").hide());
}
function GenerateAlertMenu() {
  return "<div class='alert_menu'>", "</div>", "<div class='alert_menu'></div>";
}
function GenerateTitleInputBlock(e, t, r, n) {
  var l = "";
  return (
    (l += "<div class='alert_menu_block_boder_block_center_block_line'>"),
    (l +=
      "text" == r || "password" == r
        ? GenerateNormalString(e, null, null, n)
        : GenerateNormalString(e, "text-align:center", t, n)),
    (l += "</div>"),
    ("text" != r && "password" != r) ||
      (l +=
        "<input id='" +
        t +
        "' type='" +
        r +
        "' class='alert_menu_block_boder_block_center_block_input'>"),
    "user_email" != t ||
      isForgetPassword ||
      ((l += "<div class='alert_menu_block_boder_block_center_block_line'>"),
      (l += GenerateTitleString(
        "請先驗證信箱",
        "text-align:center;" + button_cancel_color,
        "mail_hint"
      )),
      (l += "</div>"),
      (l += "<div class='alert_menu_block_boder_block_center_block_line'>"),
      (l +=
        "<div class='alert_menu_block_boder_block_center_block_mail_button' onclick='SendEmailAuthCode()' >"),
      (l += GenerateTitleString(
        "傳送驗證碼",
        "text-align:center;" + button_ok_color
      )),
      (l += "</div>"),
      (l +=
        "<div class='alert_menu_block_boder_block_center_block_mail_code_input'>"),
      (l += "<input id='auth_email_code' type='text' class='fill_parent'>"),
      (l += "</div>"),
      (l += "<div class='alert_menu_block_boder_block_center_block_line'>"),
      (l +=
        "<div class='alert_menu_block_boder_block_center_block_mail_confirm_button' onclick='SendEmailCode()' >"),
      (l += GenerateTitleString(
        "確認",
        "text-align:center;" + button_ok_color
      )),
      (l += "</div>"),
      (l += "</div>")),
    l
  );
}
function GenerateBorderBlock() {
  return (
    "<div class='alert_menu_block_boder'>",
    "</div>",
    "<div class='alert_menu_block_boder'></div>"
  );
}
function GenerateLoginMenu() {
  var e = new Array();
  e.push("會員名稱?user_account?text"), e.push("密碼?user_password?password");
  var t = 100 * (e.length + 2) + 10,
    r = "";
  (r += "<div class='alert_menu_block'>"),
    (r += GenerateBorderBlock()),
    (r += "<div class='alert_menu_block_boder_block'>"),
    (r +=
      "<div class='alert_menu_block_boder_block_center_block' style='height:" +
      t +
      "px;'>");
  for (var n = 0; n < e.length; n++) {
    var l = e[n].split("?");
    r += GenerateTitleInputBlock(l[0], l[1], l[2]);
  }
  return (
    (r += "<div class='alert_menu_block_boder_block_center_block_line'>"),
    (r += GenerateNormalString(
      "",
      "color:#F00;text-align:center",
      "login_error_text"
    )),
    (r += "</div>"),
    (r += "<div class='alert_menu_block_boder_block_center_block_line'>"),
    (r +=
      "<div class='alert_menu_block_boder_block_center_block_button' onclick='ShowRegisterView()'>"),
    (r += GenerateTitleString("註冊", "text-align:center;" + button_ok_color)),
    (r += "</div>"),
    (r +=
      "<div class='alert_menu_block_boder_block_center_block_button' onclick='SendLoginInformatoin()' style='margin-left:5%;'>"),
    (r += GenerateTitleString("登入", "text-align:center;" + button_ok_color)),
    (r += "</div>"),
    (r +=
      "<input type='checkbox' class='alert_menu_login_block_block_login_checkbox'>"),
    (r += "<div class='alert_menu_login_block_block_login_save'>"),
    (r += GenerateNormalString("記住我")),
    (r += "</div>"),
    (r +=
      "<div class='alert_menu_block_boder_block_center_block_line' onclick='ShowForgetPassword()'>"),
    (r += GenerateNormalString("忘記您的密碼？", "color:#004b97")),
    (r += "</div>"),
    (r += "</div>"),
    (r += "</div>"),
    (r += "</div>"),
    (r += GenerateBorderBlock()),
    (r += "</div>")
  );
}
function GenerateLogoutMenu() {
  var e = "";
  return (
    (e += "<div class='alert_menu_block'>"),
    (e += GenerateBorderBlock()),
    (e += "<div class='alert_menu_block_boder_block'>"),
    (e += "<div class='alert_menu_block_boder_block_center_block' >"),
    (e += "<div class='alert_menu_block_boder_block_center_block_line'>"),
    (e += GenerateTitleString(
      "確認登出嗎?",
      "text-align:center;" + button_cancel_color
    )),
    (e += "</div>"),
    (e += "<div class='alert_menu_block_boder_block_center_block_line'>"),
    (e +=
      "<div class='alert_menu_block_boder_block_center_block_button' onclick='Logout()' style='margin-left:35%;'>"),
    (e += GenerateTitleString("登出", "text-align:center;" + button_ok_color)),
    (e += "</div>"),
    (e += "</div>"),
    (e += "</div>"),
    (e += "</div>"),
    (e += GenerateBorderBlock()),
    (e += "</div>")
  );
}
function GenerateRegisterMenu() {
  var e = new Array();
  (isForgetPassword = !1),
    e.push("會員名稱(限定英文大小寫加數字)?user_account?text?true"),
    e.push("密碼?user_password?password?true"),
    e.push("確認密碼?user_confirm_password?password?true"),
    e.push("信箱?user_email?text?true"),
    e.push("名字?user_name?text?true"),
    e.push("手機?user_mobile?text");
  var t = 100 * (e.length + 2.5) + 10,
    r = "";
  (r += "<div class='alert_menu_block'>"),
    (r += GenerateBorderBlock()),
    (r += "<div class='alert_menu_block_boder_block'>"),
    (r +=
      "<div class='alert_menu_block_boder_block_center_block' style='height:" +
      t +
      "px;'>");
  for (var n = 0; n < e.length; n++) {
    var l = e[n].split("?");
    r += GenerateTitleInputBlock(l[0], l[1], l[2], l[3]);
  }
  return (
    (r += "<div class='alert_menu_block_boder_block_center_block_line'>"),
    (r +=
      "<div class='alert_menu_block_boder_block_center_block_line_checkbox'>"),
    (r += "<input id='check_register' type='checkbox' class='fill_parent'>"),
    (r += "</div>"),
    (r += "<div class='alert_menu_block_boder_block_center_block_line_agree'>"),
    (r += GenerateNormalString("我同意", "text-align:right;letter-spacing:5;")),
    (r += "</div>"),
    (r +=
      "<a class='alert_menu_block_boder_block_center_block_line_manul' href='manual.htm' target='_blank'>"),
    (r += GenerateNormalString(
      "會員同意書",
      "text-align:left;letter-spacing:5;color:#00F"
    )),
    (r += "</a>"),
    (r += "</div>"),
    (r += "<div class='alert_menu_block_boder_block_center_block_line'>"),
    (r += GenerateNormalString(
      "",
      "color:#F00;text-align:center",
      "register_error_text"
    )),
    (r += "</div>"),
    (r += "<div class='alert_menu_block_boder_block_center_block_line'>"),
    (r +=
      "<div class='alert_menu_block_boder_block_center_block_button' style='margin-left: 35%' onclick='SendRegisterInformation()' >"),
    (r += GenerateTitleString("註冊", "text-align:center;" + button_ok_color)),
    (r += "</div>"),
    (r += "</div>"),
    (r += "</div>"),
    (r += "</div>"),
    (r += GenerateBorderBlock()),
    (r += "</div>")
  );
}
function GenerateForgetPasswordMenu() {
  var e = new Array();
  (isForgetPassword = !0),
    e.push("請輸入會員名稱?user_account?text?true"),
    e.push("請輸入信箱?user_email?text?true"),
    e.push(" ?froget_password_hint?string?false");
  var t = 100 * e.length + 10,
    r = "";
  (r += "<div class='alert_menu_block'>"),
    (r += GenerateBorderBlock()),
    (r += "<div class='alert_menu_block_boder_block'>"),
    (r +=
      "<div class='alert_menu_block_boder_block_center_block' style='height:" +
      t +
      "px;'>");
  for (var n = 0; n < e.length; n++) {
    var l = e[n].split("?");
    r += GenerateTitleInputBlock(l[0], l[1], l[2], l[3]);
  }
  return (
    (r += "<div class='alert_menu_block_boder_block_center_block_line'>"),
    (r +=
      "<div class='alert_menu_block_boder_block_center_block_button' style='margin-left: 35%' onclick='SendForgetPassword()' >"),
    (r += GenerateTitleString("傳送", "text-align:center;" + button_ok_color)),
    (r += "</div>"),
    (r += "</div>"),
    (r += "</div>"),
    (r += "</div>"),
    (r += GenerateBorderBlock()),
    (r += "</div>")
  );
}
function GenerateAuthMenu() {
  var e = new Array();
  e.push("請輸入驗證碼(大小寫有區分)?auth_code?text?true"),
    e.push("請到信箱確認驗證碼?auth_hint?string?false");
  var t = 100 * e.length + 10,
    r = "";
  (r += "<div class='alert_menu_block'>"),
    (r += GenerateBorderBlock()),
    (r += "<div class='alert_menu_block_boder_block'>"),
    (r +=
      "<div class='alert_menu_block_boder_block_center_block' style='height:" +
      t +
      "px;'>");
  for (var n = 0; n < e.length; n++) {
    var l = e[n].split("?");
    r += GenerateTitleInputBlock(l[0], l[1], l[2], l[3]);
  }
  return (
    (r += "<div class='alert_menu_block_boder_block_center_block_line'>"),
    (r +=
      "<div class='alert_menu_block_boder_block_center_block_button' style='margin-left: 35%' onclick='SendAuthCode()' >"),
    (r += GenerateTitleString("傳送", "text-align:center;" + button_ok_color)),
    (r += "</div>"),
    (r += "</div>"),
    (r += "</div>"),
    (r += "</div>"),
    (r += GenerateBorderBlock()),
    (r += "</div>")
  );
}
function ShowLoginMenu() {
  SetDefaultAlerMenu(),
    0 != gToken.length
      ? $(".alert_menu").append(GenerateLogoutMenu())
      : $(".alert_menu").append(GenerateLoginMenu());
}
function ChangeToClassPage() {
  window.location.assign("./index.htm");
}
function ChangeToAdminPage() {
  gAdmin && window.location.assign("./admin/admin.htm");
}
function ShowShoppingCar() {
  0 != gToken.length &&
    (SetDefaultAlerMenu(),
    $(".alert_menu").append(GenerateShoppingCar()),
    UpdateTotalPrice());
}
function ChangeToMemberPage() {
  0 != gToken.length &&
    (0 != gShoppingCarList.length
      ? confirm("提醒您，購物車尚未結帳，是否前往會員中心?") &&
        window.location.assign("./member.htm")
      : window.location.assign("./member.htm"));
}
function SendLoginInformatoin() {
  var e = $("#user_account").val(),
    t = $("#user_password").val();
  if (0 != e.length)
    if (0 != t.length) {
      $("#login_error_text").html("");
      var r = new Array();
      r.push(e),
        r.push(t),
        SendCommand(CMD_LOGIN, CreateJSONObject(CMD_LOGIN, r));
    } else $("#user_password").attr("placeholder", "請輸入密碼");
  else $("#user_account").attr("placeholder", "請輸入帳號");
}
function ShowRegisterView() {
  SetDefaultAlerMenu(), $(".alert_menu").append(GenerateRegisterMenu());
}
function ShowForgetPassword() {
  SetDefaultAlerMenu(), $(".alert_menu").append(GenerateForgetPasswordMenu());
}
function Logout() {
  SendCommand(CMD_LOGOUT, CreateJSONObject(CMD_LOGOUT, new Array()));
}
function SendRegisterInformation() {
  if ($("#check_register").is(":checked")) {
    var e = $("#user_account").val(),
      t = $("#user_password").val(),
      r = $("#user_confirm_password").val(),
      n = ($("#user_email").val(), $("#auth_email_code").val()),
      l = $("#user_name").val(),
      o = $("#user_mobile").val();
    if (0 != e.length)
      if (0 != t.length)
        if (0 != r.length)
          if (0 != n.length)
            if (0 != l.length)
              if (r == t)
                if (gIsVerifyMail) {
                  var a = new Array();
                  a.push(e),
                    a.push(t),
                    a.push(n),
                    a.push(l),
                    a.push(o),
                    SendCommand(
                      CMD_REGISTER,
                      CreateJSONObject(CMD_REGISTER, a)
                    );
                } else alert("請先驗證信箱");
              else
                $("#user_confirm_password")
                  .val("")
                  .attr("placeholder", "密碼不符");
            else $("#user_name").attr("placeholder", "請輸入名字");
          else $("#auth_email_code").attr("placeholder", "請輸入信箱驗證碼");
        else $("#user_confirm_password").attr("placeholder", "請輸入確認密碼");
      else $("#user_password").attr("placeholder", "請輸入密碼");
    else $("#user_account").attr("placeholder", "請輸入帳號");
  } else alert("請同意會員書");
}
function SendForgetPassword() {
  var e = $("#user_account").val(),
    t = $("#user_email").val();
  if (0 != e.length)
    if (0 != t.length) {
      var r = new Array();
      r.push(t),
        r.push(e),
        SendCommand(CMD_FORGET, CreateJSONObject(CMD_FORGET, r));
    } else $("#user_email").attr("placeholder", "請輸入信箱");
  else $("#user_account").attr("placeholder", "請輸入會員名稱");
}
function SendAuthCode() {
  var e = $("#auth_code").val();
  if (0 != e.length) {
    var t = new Array();
    t.push(e), SendCommand(CMD_AUTH_CODE, CreateJSONObject(CMD_AUTH_CODE, t));
  } else $("#auth_code").attr("placeholder", "請輸入驗證碼");
}
function SendEmailAuthCode() {
  var e = $("#user_email").val();
  if (0 != e.length)
    if (null != e.match(/@/g))
      if (null == e.match(/hinet/g)) {
        var t = new Array();
        t.push(e),
          SendCommand(
            CMD_RE_SEND_EMAIL,
            CreateJSONObject(CMD_RE_SEND_EMAIL, t)
          );
      } else
        $("#user_email")
          .val("")
          .attr("placeholder", "請勿使用hinet信箱，以免收不到驗證信");
    else $("#user_email").val("").attr("placeholder", "請輸入正確信箱");
  else $("#user_email").attr("placeholder", "請輸入信箱");
}
function SendEmailCode() {
  var e = $("#auth_email_code").val();
  if (0 != e.length) {
    var t = new Array();
    t.push(e),
      SendCommand(
        CMD_SEND_EMAIL_CODE,
        CreateJSONObject(CMD_SEND_EMAIL_CODE, t)
      );
  } else $("#auth_email_code").attr("placeholder", "請輸入信箱驗證碼");
}
function HideAlertMenu() {
  $(".alert_menu").empty().hide();
}
