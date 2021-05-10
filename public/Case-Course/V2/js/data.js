var data = {
  isDebug: true,
  token: "",
  browserAlert: "本站建議使用Google Chrome瀏覽器以獲得最佳使用體驗",
  header: [
    {
      text: "管理者介面",
      href: "javascript:void(0);",
      isNeedShow: false,
    },
    {
      text: "購物車",
      href: "javascript:void(0);",
      isNeedShow: false,
    },
    {
      text: "會員中心",
      href: "javascript:void(0);",
      isNeedShow: false,
    },
    {
      text: "登入",
      href: "javascript:void(0);",
      isNeedShow: false,
    },
    {
      text: "登出",
      href: "javascript:void(0);",
      isNeedShow: false,
    },
    {
      text: "課程內容",
      href: "javascript:void(0);",
      isNeedShow: false,
    },
  ],
  index: {
    title: "朱智青老師影像",
  },
};
function SetHeaderTextVisibility(text, isShow) {
  for (var i = 0; i < global.header.length; i++) {
    var obj = global.header[i];
    if (text == obj.text) {
      obj.isNeedShow = isShow;
    }
  }
}
