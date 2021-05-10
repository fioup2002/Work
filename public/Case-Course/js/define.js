var obj,
  PAGE_INDEX = 0,
  PAGE_MEMBER = 1,
  gCurrentPage = 0,
  CMD_GET_CLASS = "get_all_class",
  CMD_LOGIN = "login",
  CMD_REGISTER = "register",
  CMD_FORGET = "forget",
  CMD_MODIFY = "modify",
  CMD_CHECK_TOKEN = "check_token",
  CMD_GET_USER_INFO = "get_user_info",
  CMD_GET_CLASS_CONTENT = "get_class_content",
  CMD_BUY_CLASS = "buy_class",
  CMD_GET_ORDER = "get_order",
  CMD_REPORT_ORDER = "report_order",
  CMD_AUTH_CODE = "auth_code",
  CMD_LOGOUT = "logout",
  CMD_RE_SEND_EMAIL = "resend_email",
  CMD_SEND_EMAIL_CODE = "send_email_email_code",
  CMD_GET_ACTIVITY = "get_activity",
  CMD_GET_ACTIVITY_DETAIL = "get_activity_detail",
  WEB_VERSION = "1.0.74",
  gToken = "",
  gName = "",
  gEmail = "",
  gPhone = "",
  gAccount = "",
  gIsCheckToken = !1,
  gClasses = new Array(),
  gBought_classes = new Array(),
  gReal_classes = new Array(),
  gClass_content = "",
  gOrder_List = new Array(),
  gOrder_Type = 0,
  gAdmin = !1,
  gIsBuy = !1,
  gTestVideoUrl = "https://player.vimeo.com/video/340871198",
  gIsVerifyMail = !1,
  gShoppingCarList = new Array(),
  server = "/api",
  user_api = "/user",
  course_api = "/course",
  order_api = "/order",
  indexphp = "/index.php",
  button_ok_color = "color:#2ea3f2;",
  button_cancel_color = "color:#F00;",
  normal_questions = new Array();
((obj = new Object()).title = "課程如何購買?"),
  (obj.answer = "1. 在首頁上選擇想購買的課程與想要的觀看時間長度，並加入購物車<br>2. 結帳並付款<br>3. 等待管理員確認付款<br>4. 請享受您購買的課程"),
  normal_questions.push(obj),
  ((obj = new Object()).title = "購買後如何付款?"),
  (obj.answer = "目前我們接受轉帳，轉帳帳號請參考會員中心內提供的資訊"),
  normal_questions.push(obj),
  ((obj = new Object()).title = "登入時為什麼收不到驗證信?"),
  (obj.answer = "請檢查信箱中的垃圾郵件"),
  normal_questions.push(obj),
  ((obj = new Object()).title = "如何知道我的環境可以觀看站上的課程影片?"),
  (obj.answer = "下面是一個示範影片，如果您可以順利觀看的話，<br>代表您可以觀看本站上所有的課程影片"),
  normal_questions.push(obj),
  ((obj = new Object()).title = "網站登入需要注意哪些事項?"),
  (obj.answer = "為了保障使用者帳號安全，本站在登入時全面使用兩階段驗證。<br>在輸入完帳號密碼後，請到您當初註冊時填寫的信箱收取驗證碼並填入才能登入"),
  normal_questions.push(obj),
  ((obj = new Object()).title = "為什麼有時候會出現「登入逾期」的提示?"),
  (obj.answer = "因為安全性考量，每次從登入開始後，只能使用40分鐘，<br>時間一到就會切斷請使用者重新登入。<br>但是如果您正在收看課程影片，沒有進行其他操作的話，則不受影響"),
  normal_questions.push(obj),
  ((obj = new Object()).title = "網站建議的環境為何？"),
  (obj.answer = "本站建議使用Google Chrome瀏覽器以獲得最佳使用體驗"),
  normal_questions.push(obj),
  console.log(WEB_VERSION);
var gFreeCourse = new Array();
var gActivitys = new Array();
