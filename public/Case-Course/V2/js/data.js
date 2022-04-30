var data = {
  token: "",
  browserAlert: "本站建議使用Google Chrome瀏覽器以獲得最佳使用體驗",
  header: [
    {
      text: "管理者介面",
      isNeedShow: false,
    },
    {
      text: "購物車",
      isNeedShow: false,
    },
    {
      text: "會員中心",
      isNeedShow: false,
    },
    {
      text: "登入",
      isNeedShow: true,
    },
    {
      text: "登出",
      isNeedShow: false,
    },
    {
      text: "課程內容",
      isNeedShow: false,
    },
  ],
  index: {
    title: "朱智青老師影像",
    banner: "平面中的風景與情懷<br><span>朱智青帶你攝影、編修與旅拍</span>",
  },
  alert: {
    type: "register",
    login: {
      list: [
        { label: "會員名稱", value: "", type: "text" },
        { label: "密碼", value: "", type: "password" },
      ],
      button: ["註冊", "登入"],
      remember: {
        text: "記住我",
        isSelect: false,
      },
      forget: "忘記您的密碼？",
    },
    register: {
      list: [
        { label: "會員名稱(限定英文大小寫加數字)", value: "", type: "text" },
        { label: "密碼", value: "", type: "password" },
        { label: "確認密碼", value: "", type: "password" },
        { label: "信箱", value: "", type: "text" },
        {
          hint: "請先驗證信箱",
          send: "傳送驗證碼",
          confirm: "確認",
          code: "",
          type: "verify"
        },
        { label: "名字", value: "", type: "text" },
        { label: "手機", value: "", type: "text" },
      ],
      agree:{
        isSelect: false,
        text: "我同意",
        href: "會員同意書"
      }
    },
  },
};
