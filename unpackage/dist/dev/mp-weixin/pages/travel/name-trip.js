"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      form: {
        name: "",
        city: "",
        startDate: "",
        endDate: ""
      }
    };
  },
  computed: {
    formValid() {
      return this.form.name && this.form.city && this.form.startDate && this.form.endDate;
    },
    daysCount() {
      if (!this.form.startDate || !this.form.endDate)
        return 0;
      const start = new Date(this.form.startDate);
      const end = new Date(this.form.endDate);
      return Math.ceil((end - start) / (1e3 * 60 * 60 * 24)) + 1;
    }
  },
  methods: {
    handleCityChange(e) {
      const [province, city] = e.detail.value;
      const municipalities = ["北京市", "上海市", "天津市", "重庆市"];
      if (municipalities.includes(province)) {
        this.form.city = province;
      } else {
        this.form.city = province + city;
      }
    },
    handleStartDate(e) {
      this.form.startDate = e.detail.value;
      if (new Date(this.form.endDate) < new Date(e.detail.value)) {
        this.form.endDate = "";
      }
    },
    handleEndDate(e) {
      this.form.endDate = e.detail.value;
    },
    handleConfirm() {
      if (!this.formValid)
        return;
      const newTrip = {
        id: Date.now(),
        ...this.form,
        days: Array(this.daysCount).fill().map((_, i) => ({
          day: i + 1,
          attractions: []
        }))
      };
      const trips = common_vendor.index.getStorageSync("trips") || [];
      trips.push(newTrip);
      common_vendor.index.setStorageSync("trips", trips);
      common_vendor.index.navigateTo({
        url: `/pages/travel/detail-trip?id=${newTrip.id}`
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
    a: $data.form.name,
    b: common_vendor.o(($event) => $data.form.name = $event.detail.value),
    c: common_vendor.t($data.form.city || "请选择城市"),
    d: common_vendor.p({
      type: "arrowright",
      size: "18",
      color: "#999"
    }),
    e: common_vendor.o((...args) => $options.handleCityChange && $options.handleCityChange(...args)),
    f: common_vendor.t($data.form.startDate || "请选择开始日期"),
    g: common_vendor.p({
      type: "calendar",
      size: "18",
      color: "#999"
    }),
    h: $data.form.startDate,
    i: common_vendor.o((...args) => $options.handleStartDate && $options.handleStartDate(...args)),
    j: common_vendor.t($data.form.endDate || "请选择结束日期"),
    k: common_vendor.p({
      type: "calendar",
      size: "18",
      color: "#999"
    }),
    l: $data.form.endDate,
    m: $data.form.startDate,
    n: common_vendor.o((...args) => $options.handleEndDate && $options.handleEndDate(...args)),
    o: !$options.formValid ? 1 : "",
    p: common_vendor.o((...args) => $options.handleConfirm && $options.handleConfirm(...args))
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/travel/name-trip.js.map
