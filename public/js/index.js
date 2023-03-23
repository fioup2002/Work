new Vue({
  el: "#main",
  data: {
    text: "可以測試嗎?",
    result: "",
  },
  mounted() {},
  methods: {
    submit(){
      this.send("/chatGPT", { text: this.text }, (res) => {
        this.result += `${res}<br>`;
      });
    },
    send(url, data, cb) {
      var setting = new Object();
      setting.url = url;
      setting.data = data;
      setting.type = "GET";
      setting.success = (res) => {
        cb(res);
      };
      $.ajax(setting);
    },
  },
});
