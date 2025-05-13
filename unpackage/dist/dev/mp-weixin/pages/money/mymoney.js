"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      form: {
        type: "",
        amount: "",
        location: "",
        date: ""
      }
    };
  },
  computed: {
    formValid() {
      return this.form.type && this.form.amount && this.form.location && this.form.date;
    }
  },
  methods: {
    handleLocationChange(e) {
      this.form.location = e.detail.value.join("");
    },
    handleDate(e) {
      this.form.date = e.detail.value;
    },
    handleConfirm() {
      if (!this.formValid)
        return;
      common_vendor.index.navigateTo({
        url: "/pages/money/money1"
      });
    }
  }
};
if (!Array) {
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  _easycom_uni_icons2();
}
const _easycom_uni_icons = () => "../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
if (!Math) {
  _easycom_uni_icons();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: $data.form.type,
    b: common_vendor.o(($event) => $data.form.type = $event.detail.value),
    c: $data.form.amount,
    d: common_vendor.o(($event) => $data.form.amount = $event.detail.value),
    e: common_vendor.t($data.form.location || "请选择付款地点"),
    f: common_vendor.p({
      type: "arrowright",
      size: "18",
      color: "#999"
    }),
    g: common_vendor.o((...args) => $options.handleLocationChange && $options.handleLocationChange(...args)),
    h: common_vendor.t($data.form.date || "请选择消费日期"),
    i: common_vendor.p({
      type: "calendar",
      size: "18",
      color: "#999"
    }),
    j: $data.form.date,
    k: common_vendor.o((...args) => $options.handleDate && $options.handleDate(...args)),
    l: !$options.formValid ? 1 : "",
    m: common_vendor.o((...args) => $options.handleConfirm && $options.handleConfirm(...args))
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/money/mymoney.js.map
