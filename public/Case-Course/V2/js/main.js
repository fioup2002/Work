var global;
$(function () {
  new Vue({
    el: "#main",
    data: data,
    created() {
      global = this;
      if (gPage == "index") {
        $("head").append("<title>" + global.index.title + "</title>");
      }
    },
    mounted() {
      global.CheckBrowser();
      global.CheckToken();
      if (gPage == "index") {
        SetHeaderTextVisibility("登入",true);
        global.GetAllClass();
        global.GetHeaderTextWidth();
      }
    },
    methods: {
      CheckBrowser() {
        if (navigator.userAgent.search("Safari") <= -1) {
          alert(global.browserAlert);
        }
      },
      CheckToken() {
        if (localStorage.length != 0 && localStorage.token.length != 0) {
          global.token = localStorage.token;
          SendCommand("check_token_valid");
        }
      },
      GetAllClass() {
        SendCommand("get_all_course");
      },
      GenerateText(text) {
        var res = "";
        res += "<table class='text_block'>";
        res += "<td class='text_block_td'>";
        res += text;
        res += "</td>";
        res += "</table>";
        return res;
      },
      GetHeaderTextWidth() {
        var count = 0;
        for(var i = 0; i < global.header.length;i++){
          var obj = global.header[i];
          if(obj.isNeedShow){
            count++;
          }
        }
        return "width: calc(100% - (125px + 10px) * "+count+")";
      },
    },
  });
});
