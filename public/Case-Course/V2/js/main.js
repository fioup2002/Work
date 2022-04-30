var global;
$(function () {
  new Vue({
    el: "#main",
    data: data,
    created() {
      global = this;
      this.SetRem();
      window.onresize = () => {
        return (() => {
          this.SetRem();
        })();
      };
      this.CheckBrowser();
      this.CheckToken();
    },
    mounted() {
      if (gPage == "index") {
        // SendCommand("get_all_course");
        // SendCommand("get_all_event");
      }
    },
    methods: {
      SetRem() {
        var width = document.body.clientWidth;
        if (width > 750 && width < 1920) {
          document.documentElement.style.fontSize = width / 19.2 + "px";
        } else {
          document.documentElement.style.fontSize = "100px";
        }
      },
      CheckBrowser() {
        if (navigator.userAgent.search("Safari") <= -1) {
          alert(global.browserAlert);
        }
      },
      SetHeader(text, isNeedShow) {
        this.header.forEach((obj) => {
          if (obj.text == text) {
            obj.isNeedShow = isNeedShow;
          }
        });
      },
      CheckToken() {
        if (localStorage.length != 0 && localStorage.token.length != 0) {
          this.token = localStorage.token;
          SendCommand("check_token_valid");
        }
      },
    },
  });
});
