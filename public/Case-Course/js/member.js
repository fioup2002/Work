function InitialScreen()
{
  if (gCurrentPage = PAGE_MEMBER, $("body").append(GenerateBody()), $("body").append(GenerateAlertMenu()), $(".alert_menu").on("click", function (o)
    {
      o.target == o.currentTarget && HideAlertMenu()
    }
    ), 0 != localStorage.length && 0 != localStorage.token.length)
  {
    gToken = localStorage.token;
    var o = new Array;
    o.push(gToken),
    SendCommand(CMD_CHECK_TOKEN, CreateJSONObject(CMD_CHECK_TOKEN, o)),
    gIsCheckToken = !0
  }
  else
    ChangeToClassPage();
  ShowFunctionDetail("訂單紀錄")
}
function GenerateBody()
{
  var o = "";
  return o += "<div class='body'>",
  o += GenerateBorder(),
  o += GenerateHeader(PAGE_MEMBER),
  o += GenerateContent(),
  o += "</div>"
}
function GenerateDataInputBlock(o, t, e, n)
{
  var i = "";
  if (i += "<div class='function_detail_line'>", i += "<div class='function_detail_line_title'>", i += GenerateNormalString(o, "text-align:center", "", n), i += "</div>", i += "<div class='function_detail_line_input'>", "text" == e || "password" == e)
    i += "user_email" == t ? "<input id='" + t + "' type='" + e + "' class='fill_parent' onkeyup='UpdateAuthEmail()'>" : "<input id='" + t + "' type='" + e + "' class='fill_parent'>";
  else if ("select" == e)
    i += "<select id='" + t + "' class='fill_parent'>", i += GenerateBankCode(), i += "</select>";
  else if ("date" == e)
  {
    var a = new Date,
    l = a.getDate(),
    r = a.getMonth() + 1;
    l < 10 && (l = "0" + l),
    r < 10 && (r = "0" + r),
    i += "<input id='" + t + "' type='" + e + "' class='fill_parent' value='" + (a.getFullYear() + "-" + r + "-" + l) + "'>"
  }
  return i += "</div>",
  i += "</div>"
}
function GenerateResponseBlock(o)
{
  var t = "";
  return t += "<div class='function_detail_line'>",
  t += GenerateNormalString("", "text-align:center;" + button_cancel_color, o, !1),
  t += "</div>"
}
function GenerateOKbutton(o, t)
{
  var e = "";
  return e += "<div class='function_detail_line'>",
  e += "<div class='function_detail_line_button' onclick='ChangeSetting(\"" + o + '",' + t + ")'>",
  e += GenerateNormalString("確認", "text-align:center;" + button_ok_color, "", !1),
  e += "</div>",
  e += "</div>"
}
function GenerateBankCode()
{
  return "<option value='001'>001 - 中央信託</option>",
  "<option value='003'>003 - 交通銀行</option>",
  "<option value='004'>004 - 臺灣銀行</option>",
  "<option value='005'>005 - 土地銀行</option>",
  "<option value='006'>006 - 合庫商銀</option>",
  "<option value='007'>007 - 第一銀行</option>",
  "<option value='008'>008 - 華南銀行</option>",
  "<option value='009'>009 - 彰化銀行</option>",
  "<option value='010'>010 - 華僑銀行</option>",
  "<option value='011'>011 - 上海銀行</option>",
  "<option value='012'>012 - 台北富邦\t</option>",
  "<option value='013'>013 - 國泰世華</option>",
  "<option value='016'>016 - 高雄銀行</option>",
  "<option value='017'>017 - 兆豐商銀</option>",
  "<option value='018'>018 - 農業金庫</option>",
  "<option value='021'>021 - 花旗銀行</option>",
  "<option value='024'>024 - 運通銀行</option>",
  "<option value='025'>025 - 首都銀行</option>",
  "<option value='039'>039 - 荷蘭銀行</option>",
  "<option value='040'>040 - 中華開發</option>",
  "<option value='050'>050 - 臺灣企銀</option>",
  "<option value='051'>051 - 台北商銀</option>",
  "<option value='052'>052 - 新竹商銀</option>",
  "<option value='053'>053 - 台中商銀</option>",
  "<option value='054'>054 - 京城商銀</option>",
  "<option value='056'>056 - 花蓮企銀</option>",
  "<option value='057'>057 - 台東企銀</option>",
  "<option value='075'>075 - 東亞銀行</option>",
  "<option value='081'>081 - 匯豐銀行</option>",
  "<option value='083'>083 - 渣打銀行</option>",
  "<option value='087'>087 - 標旗銀行</option>",
  "<option value='101'>101 - 台北一信</option>",
  "<option value='102'>102 - 華泰銀行</option>",
  "<option value='103'>103 - 臺灣新光商銀</option>",
  "<option value='104'>104 - 台北五信</option>",
  "<option value='106'>106 - 台北九信</option>",
  "<option value='108'>108 - 陽信銀行</option>",
  "<option value='114'>114 - 基隆一信</option>",
  "<option value='115'>115 - 基隆二信</option>",
  "<option value='118'>118 - 板信銀行</option>",
  "<option value='119'>119 - 淡水一信</option>",
  "<option value='120'>120 - 淡水信合社</option>",
  "<option value='124'>124 - 宜蘭信合社</option>",
  "<option value='127'>127 - 桃園信合社</option>",
  "<option value='130'>130 - 新竹一信</option>",
  "<option value='132'>132 - 新竹三信</option>",
  "<option value='139'>139 - 竹南信合社</option>",
  "<option value='146'>146 - 台中二信</option>",
  "<option value='147'>147 - 三信銀行</option>",
  "<option value='151'>151 - 第七商銀</option>",
  "<option value='158'>158 - 彰化一信</option>",
  "<option value='161'>161 - 彰化五信</option>",
  "<option value='162'>162 - 彰化六信</option>",
  "<option value='163'>163 - 彰化十信</option>",
  "<option value='165'>165 - 鹿港信合社</option>",
  "<option value='178'>178 - 嘉義三信</option>",
  "<option value='179'>179 - 嘉義四信</option>",
  "<option value='188'>188 - 台南三信</option>",
  "<option value='203'>203 - 高雄二信</option>",
  "<option value='204'>204 - 高雄三信</option>",
  "<option value='215'>215 - 花蓮一信</option>",
  "<option value='216'>216 - 花蓮二信</option>",
  "<option value='222'>222 - 澎湖一信</option>",
  "<option value='223'>223 - 澎湖二信</option>",
  "<option value='224'>224 - 金門信合社</option>",
  "<option value='700'>700 - 中華郵政</option>",
  "<option value='803'>803 - 聯邦銀行</option>",
  "<option value='804'>804 - 中華銀行</option>",
  "<option value='805'>805 - 遠東銀行</option>",
  "<option value='806'>806 - 復華銀行</option>",
  "<option value='807'>807 - 建華銀行</option>",
  "<option value='808'>808 - 玉山銀行</option>",
  "<option value='809'>809 - 萬泰銀行</option>",
  "<option value='810'>810 - 寶華銀行</option>",
  "<option value='812'>812 - 台新銀行</option>",
  "<option value='814'>814 - 大眾銀行</option>",
  "<option value='815'>815 - 日盛銀行</option>",
  "<option value='816'>816 - 安泰銀行</option>",
  "<option value='822'>822 - 中國信託</option>",
  "<option value='825'>825 - 慶豐銀行</option>",
  "<option value='001'>001 - 中央信託</option><option value='003'>003 - 交通銀行</option><option value='004'>004 - 臺灣銀行</option><option value='005'>005 - 土地銀行</option><option value='006'>006 - 合庫商銀</option><option value='007'>007 - 第一銀行</option><option value='008'>008 - 華南銀行</option><option value='009'>009 - 彰化銀行</option><option value='010'>010 - 華僑銀行</option><option value='011'>011 - 上海銀行</option><option value='012'>012 - 台北富邦\t</option><option value='013'>013 - 國泰世華</option><option value='016'>016 - 高雄銀行</option><option value='017'>017 - 兆豐商銀</option><option value='018'>018 - 農業金庫</option><option value='021'>021 - 花旗銀行</option><option value='024'>024 - 運通銀行</option><option value='025'>025 - 首都銀行</option><option value='039'>039 - 荷蘭銀行</option><option value='040'>040 - 中華開發</option><option value='050'>050 - 臺灣企銀</option><option value='051'>051 - 台北商銀</option><option value='052'>052 - 新竹商銀</option><option value='053'>053 - 台中商銀</option><option value='054'>054 - 京城商銀</option><option value='056'>056 - 花蓮企銀</option><option value='057'>057 - 台東企銀</option><option value='075'>075 - 東亞銀行</option><option value='081'>081 - 匯豐銀行</option><option value='083'>083 - 渣打銀行</option><option value='087'>087 - 標旗銀行</option><option value='101'>101 - 台北一信</option><option value='102'>102 - 華泰銀行</option><option value='103'>103 - 臺灣新光商銀</option><option value='104'>104 - 台北五信</option><option value='106'>106 - 台北九信</option><option value='108'>108 - 陽信銀行</option><option value='114'>114 - 基隆一信</option><option value='115'>115 - 基隆二信</option><option value='118'>118 - 板信銀行</option><option value='119'>119 - 淡水一信</option><option value='120'>120 - 淡水信合社</option><option value='124'>124 - 宜蘭信合社</option><option value='127'>127 - 桃園信合社</option><option value='130'>130 - 新竹一信</option><option value='132'>132 - 新竹三信</option><option value='139'>139 - 竹南信合社</option><option value='146'>146 - 台中二信</option><option value='147'>147 - 三信銀行</option><option value='151'>151 - 第七商銀</option><option value='158'>158 - 彰化一信</option><option value='161'>161 - 彰化五信</option><option value='162'>162 - 彰化六信</option><option value='163'>163 - 彰化十信</option><option value='165'>165 - 鹿港信合社</option><option value='178'>178 - 嘉義三信</option><option value='179'>179 - 嘉義四信</option><option value='188'>188 - 台南三信</option><option value='203'>203 - 高雄二信</option><option value='204'>204 - 高雄三信</option><option value='215'>215 - 花蓮一信</option><option value='216'>216 - 花蓮二信</option><option value='222'>222 - 澎湖一信</option><option value='223'>223 - 澎湖二信</option><option value='224'>224 - 金門信合社</option><option value='700'>700 - 中華郵政</option><option value='803'>803 - 聯邦銀行</option><option value='804'>804 - 中華銀行</option><option value='805'>805 - 遠東銀行</option><option value='806'>806 - 復華銀行</option><option value='807'>807 - 建華銀行</option><option value='808'>808 - 玉山銀行</option><option value='809'>809 - 萬泰銀行</option><option value='810'>810 - 寶華銀行</option><option value='812'>812 - 台新銀行</option><option value='814'>814 - 大眾銀行</option><option value='815'>815 - 日盛銀行</option><option value='816'>816 - 安泰銀行</option><option value='822'>822 - 中國信託</option><option value='825'>825 - 慶豐銀行</option>"
}
function GenerateContent()
{
  var o = "";
  return o += "<div class='function'>",
  o += GenerateFunctionBlock("訂單紀錄"),
  o += GenerateFunctionBlock("修改資料"),
  o += "</div>"
}
function GenerateFunctionBlock(o)
{
  var t = "";
  return t += "<div class='function_block'>",
  t += "<div class='function_block_title'>",
  t += GenerateTitleString(o),
  t += "</div>",
  t += "<div class='function_block_button' onclick='ShowFunctionDetail(\"" + o + "\")'>",
  t += GenerateTitleString("+", "text-align:right;" + button_ok_color),
  t += "</div>",
  t += "</div>",
  "修改資料" == o && (t += GenerateDataBlock(o)),
  "訂單紀錄" == o && (t += GenerateHistory(o)),
  t
}
function GenerateDataBlock(o)
{
  var t = "";
  return t += "<div id='function_detail_" + o + "' class='data_block' style='height: calc(53px * 10 + 3px);'>",
  t += GenerateDataInputBlock("舊密碼", "old_password", "password", !1),
  t += GenerateDataInputBlock("新密碼", "new_password", "password", !1),
  t += GenerateDataInputBlock("確認密碼", "confirm_password", "password", !1),
  t += GenerateDataInputBlock("名字", "user_name", "text", !1),
  t += GenerateDataInputBlock("手機", "user_mobile", "text", !1),
  t += GenerateDataInputBlock("信箱", "user_email", "text", !1),
  t += "<div id='email_auth_hint_line' class='function_detail_line' style='display:none'>",
  t += "<div class='alert_menu_block_boder_block_center_block_line' >",
  t += GenerateTitleString("請先驗證信箱", "text-align:center;" + button_cancel_color, "mail_hint"),
  t += "</div>",
  t += "</div>",
  t += "<div id='email_auth_button_line' class='function_detail_line' style='display:none'>",
  t += "<div class='alert_menu_block_boder_block_center_block_line'>",
  t += "<div class='alert_menu_block_boder_block_center_block_mail_button' onclick='SendEmailAuthCode()' >",
  t += GenerateTitleString("傳送驗證碼", "text-align:center;" + button_ok_color),
  t += "</div>",
  t += "<div class='alert_menu_block_boder_block_center_block_mail_code_input'>",
  t += "<input id='auth_email_code' type='text' class='fill_parent'>",
  t += "</div>",
  t += "<div class='alert_menu_block_boder_block_center_block_mail_confirm_button' onclick='SendEmailCode()' >",
  t += GenerateTitleString("確認", "text-align:center;" + button_ok_color),
  t += "</div>",
  t += "</div>",
  t += "</div>",
  t += GenerateResponseBlock("data_response_status"),
  t += GenerateOKbutton(o),
  t += "</div>"
}
function GenerateHistory(o)
{
  var t = "";
  return t += "<div id='function_detail_" + o + "' class='data_block'>",
  t += "<div class='data_block_select' style='display:none'>",
  t += GenerateNormalString("請匯款到以下帳戶", "text-align:center;color:#F00;"),
  t += "</div>",
  t += "<div class='data_block_select' style='display:none'>",
  t += "<div class='data_block_select_label' style='margin-left:calc((100% - 100px * 4 - 150px - 200px) / 2)'>",
  t += GenerateNormalString("匯款帳戶:", "text-align:center"),
  t += "</div>",
  t += "<div class='data_block_select_label'>",
  t += GenerateNormalString("朱智青", "text-align:left;user-select: auto;"),
  t += "</div>",
  t += "<div class='data_block_select_label'>",
  t += GenerateNormalString("匯款銀行:", "text-align:center"),
  t += "</div>",
  t += "<div class='data_block_select_label' style='width:200px;'>",
  t += GenerateNormalString("中華郵政 (ATM代碼：700)", "text-align:left;user-select: auto;"),
  t += "</div>",
  t += "<div class='data_block_select_label'>",
  t += GenerateNormalString("帳號:", "text-align:center"),
  t += "</div>",
  t += "<div class='data_block_select_label' style='width:150px;'>",
  t += GenerateNormalString("03118280193703", "text-align:left;user-select: auto;"),
  t += "</div>",
  t += "</div>",
  t += "<div class='data_block_select' style='width:20%;margin-left:75%;' onclick='ChangeToUserManual()'>",
  t += GenerateNormalString("使用教學", "text-align:right;color:#00F;"),
  t += "</div>",
  t += "<div class='data_block_select'>",
  t += "<div class='data_block_select_id'>",
  t += GenerateNormalString("編號:", "text-align:center"),
  t += "</div>",
  t += "<div class='data_block_select_input'>",
  t += "<input id='order_filter' type='text' class='fill_parent' onkeyup='UpdateOrderList()'>",
  t += "</div>",
  t += "<select id='order_type' class='data_block_select_menu' onchange='ChangeOrderType()'>",
  t += "<option value='0'>所有訂單</option>",
  t += "<option value='1'>已回報，尚未確認訂單</option>",
  t += "<option value='2'>尚未回報訂單</option>",
  t += "</select>",
  t += "</div>",
  t += "<div id='data_block_order' class='data_block_order'>",
  t += "</div>",
  t += "</div>"
}
function GenerateOrderList(o, t)
{
  for (var e = "", n = 0; n < o.length; n++)
    e += "<div class='history_block'>", e += "<div class='history_block_info'>", e += "<div class='history_block_line'>", e += "<div class='history_block_line_title'>", e += GenerateNormalString("編號:", "text-align:center"), e += "</div>", e += "<div class='history_block_line_content'>", e += GenerateNormalString(o[n].ref, "", "ref_" + n), e += "</div>", e += "</div>", e += "<div class='history_block_line'>", e += "<div class='history_block_line_title'>", e += GenerateNormalString("日期:", "text-align:center"), e += "</div>", e += "<div class='history_block_line_content'>", e += GenerateNormalString(o[n].createTime), e += "</div>", e += "</div>", e += "<div class='history_block_line'>", e += "<div class='history_block_line_title'>", e += GenerateNormalString("狀態:", "text-align:center"), e += "</div>", e += "<div class='history_block_line_content'>", e += GenerateNormalString(GetOrderStatus(o[n].status)), e += "</div>", e += "</div>", e += "<div class='history_block_line'>", e += "<div class='history_block_line_title'>", e += GenerateNormalString("總價:", "text-align:center"), e += "</div>", e += "<div class='history_block_line_content'>", e += GenerateNormalString(o[n].amount), e += "</div>", e += "</div>", e += "</div>", e += "<div class='history_block_button' onclick='ShowHistoryDetailBlock(" + n + ")'>", e += 2 == t ? GenerateNormalString("回報訂單", "" + button_ok_color) : GenerateNormalString("詳細資訊", "" + button_ok_color), e += "</div>", e += "</div>", e += GenerateOrderListDetailBlock(n, o[n], t);
  return e
}
function GenerateOrderListDetailBlock(o, t, e)
{
  var n = "";
  if (n += "<div id='history_detail_" + o + "' class='history_detail_block'>", 0 == e || 1 == e)
    for (var i = 0; i < t.buyList.length; i++)
      n += GenerateOrderLine(t.buyList[i]);
  else
    2 == e && (n += GenerateRemittanceBlock(o));
  return n += "</div>"
}
function GenerateOrderLine(o)
{
  var t = o.course_name,
  e = o.duration,
  n = o.price,
  i = "";
  return i += "<div class='order_line'>",
  i += "<div class='order_line_title'>",
  i += GenerateNormalString("課程名稱:", "text-align:center"),
  i += "</div>",
  i += "<div class='order_line_name'>",
  i += GenerateNormalString(t, "text-align:center"),
  i += "</div>",
  i += "<div class='order_line_title'>",
  i += GenerateNormalString("期間:", "text-align:center"),
  i += "</div>",
  i += "<div class='order_line_duration'>",
  i += GenerateNormalString(GetValidTime(e, !0), "text-align:center"),
  i += "</div>",
  i += "<div class='order_line_title'>",
  i += GenerateNormalString("價格:", "text-align:center"),
  i += "</div>",
  i += "<div class='order_line_price'>",
  i += GenerateNormalString(n, "text-align:center"),
  i += "</div>",
  i += "</div>"
}
function GenerateRemittanceBlock(o)
{
  var t = "";
  return t += GenerateDataInputBlock("匯款帳號後5碼", "remittance_account_" + o, "text", !1),
  t += GenerateDataInputBlock("匯款銀行代碼", "remittance_code_" + o, "select", !1),
  t += GenerateDataInputBlock("匯款日期", "remittance_date_" + o, "date", !1),
  t += GenerateDataInputBlock("匯款金額", "remittance_money_" + o, "text", !1),
  t += GenerateDataInputBlock("備註", "remittance_remark_" + o, "text", !1),
  t += GenerateResponseBlock("remittance_response_status_" + o),
  t += GenerateOKbutton("訂單紀錄", o)
}
function GetOrderStatus(o)
{
  var t = "";
  return 1 == (o = parseInt(o)) ? t = "已下訂，尚未回報" : 2 == o ? t = "已回報，尚未確認" : 3 == o ? t = " 已確認，訂單流程完畢" : 4 == o && (t = "訂單關閉"),
  t
}
function ShowFunctionDetail(o)
{
  var t = $("#function_detail_" + o);
  if (t.is(":hidden"))
  {
    if (t.slideDown(), "修改資料" == o)
      SendCommand(CMD_GET_USER_INFO, CreateJSONObject(CMD_GET_USER_INFO, new Array));
    else if ("訂單紀錄" == o)
    {
      $("#order_type").val(2);
      var e = parseInt($("#order_type").val());
      $("#data_block_order").empty();
      var n = new Array;
      n.push(e),
      SendCommand(CMD_GET_ORDER, CreateJSONObject(CMD_GET_ORDER, n))
    }
  }
  else
    t.slideUp()
}
function ChangeSetting(o, t)
{
  if ("修改資料" == o)
  {
    var e = $("#user_name").val(),
    n = $("#user_email").val(),
    i = $("#auth_email_code").val(),
    a = $("#user_mobile").val(),
    l = $("#old_password").val(),
    r = $("#new_password").val(),
    p = $("#confirm_password").val();
    if (0 == e.length)
      return void $("#user_name").attr("placeholder", "請輸入名字");
    if (0 != r.length && 0 != p.length && r != p)
      return void $("#confirm_password").attr("placeholder", "密碼不符").val("");
    if (gEmail != n)
    {
      if (0 == i.length)
        return void $("#auth_email_code").attr("placeholder", "請輸入信箱驗證碼");
      if (!gIsVerifyMail)
        return void alert("請先驗證信箱")
    }
    var u = new Array;
    u.push(l),
    u.push(r),
    u.push(e),
    u.push(i),
    u.push(a),
    SendCommand(CMD_MODIFY, CreateJSONObject(CMD_MODIFY, u))
  }
  if ("訂單紀錄" == o)
  {
    var v = $("#remittance_account_" + t).val(),
    c = $("#remittance_code_" + t).val(),
    _ = $("#remittance_date_" + t).val(),
    d = $("#remittance_money_" + t).val(),
    s = $("#remittance_remark_" + t).val(),
    m = $("#ref_" + t).html();
    if (5 != v.length)
      return void $("#remittance_account_" + t).attr("placeholder", "請輸入帳號後5碼").val("");
    if (0 == v.length)
      return void $("#remittance_date_" + t).attr("placeholder", "請輸入日期");
    if (0 == d.length)
      return void $("#remittance_money_" + t).attr("placeholder", "請輸入金額");
    var g = new Array;
    g.push(m),
    g.push(c),
    g.push(v);
    var k = _.split("-"),
    h = k[1] + "/" + k[2] + "/" + k[0];
    _ = new Date(h).getTime(),
    g.push(_ / 1e3),
    g.push(d),
    g.push(s),
    SendCommand(CMD_REPORT_ORDER, CreateJSONObject(CMD_REPORT_ORDER, g))
  }
}
function ShowHistoryDetailBlock(o)
{
  var t = $("#history_detail_" + o);
  t.is(":hidden") ? t.slideDown() : t.slideUp()
}
function ChangeOrderType()
{
  var o = parseInt($("#order_type").val());
  $("#data_block_order").empty(),
  $("#order_filter").val("");
  var t = new Array;
  t.push(o),
  SendCommand(CMD_GET_ORDER, CreateJSONObject(CMD_GET_ORDER, t))
}
function UpdateOrderList()
{
  var o = $("#order_filter").val(),
  t = new Array;
  if (0 != o.length)
    for (var e = new RegExp(o, "g"), n = 0; n < gOrder_List.length; n++)
      null != gOrder_List[n].ref.match(e) && t.push(gOrder_List[n]);
  else
    t = gOrder_List;
  $("#data_block_order").empty().append(GenerateOrderList(t, gOrder_Type))
}
function UpdateAuthEmail()
{
  var o = $("#user_email").val();
  gEmail != o ? ($("#email_auth_hint_line").show(), $("#email_auth_button_line").show()) : ($("#email_auth_hint_line").hide(), $("#email_auth_button_line").hide())
}
function ChangeToUserManual()
{
  window.open("./order_tutorial.pdf")
}