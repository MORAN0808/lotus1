"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      activeDayIndex: 0,
      day1Attractions: [
        { name: "豫园", time: "9:00-11:00" },
        { name: "南京路步行街", time: "14:00-16:30" },
        { name: "东方明珠", time: "17:00-17:30" },
        { name: "外滩", time: "19:00-21:00" }
      ],
      day2Attractions: [
        { name: "武康路", time: "9:00-11:00" },
        { name: "安福路", time: "14:00-15:30" },
        { name: "同济大学", time: "16:15-17:30" },
        { name: "上海交大", time: "18:00-19:00" },
        { name: "陆家嘴", time: "20:00-21:00" }
      ],
      day3Attractions: [
        { name: "静安寺", time: "10:00-11:00" },
        { name: "城隍庙", time: "12:40-15:30" },
        { name: "人民广场", time: "15:30-17:30" }
      ],
      day4Attractions: [
        { name: "鲁迅公园", time: "9:00-11:00" },
        { name: "多伦路", time: "14:20-16:30" },
        { name: "1933老场坊", time: "17:30-19:00" }
      ],
      day5Attractions: [
        { name: "迪士尼", time: "7:00-22:00" }
      ]
    };
  },
  methods: {
    switchDay(index) {
      this.activeDayIndex = index;
    },
    navigateToMap(placeName) {
      common_vendor.index.showToast({
        title: `导航到${placeName}`,
        icon: "none"
      });
    },
    navigateToDetail(pageName) {
      common_vendor.index.navigateTo({
        url: `/pages/travel/${pageName}`
      });
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: $data.activeDayIndex === 0 ? 1 : "",
    b: common_vendor.o(($event) => $options.switchDay(0)),
    c: $data.activeDayIndex === 1 ? 1 : "",
    d: common_vendor.o(($event) => $options.switchDay(1)),
    e: $data.activeDayIndex === 2 ? 1 : "",
    f: common_vendor.o(($event) => $options.switchDay(2)),
    g: $data.activeDayIndex === 3 ? 1 : "",
    h: common_vendor.o(($event) => $options.switchDay(3)),
    i: $data.activeDayIndex === 4 ? 1 : "",
    j: common_vendor.o(($event) => $options.switchDay(4)),
    k: $data.activeDayIndex === 0
  }, $data.activeDayIndex === 0 ? {
    l: common_vendor.f($data.day1Attractions, (item, index, i0) => {
      return common_vendor.e({
        a: common_vendor.t(item.name),
        b: common_vendor.t(item.time),
        c: common_vendor.o(($event) => $options.navigateToMap(item.name), index),
        d: index < $data.day1Attractions.length - 1
      }, index < $data.day1Attractions.length - 1 ? {} : {}, {
        e: index,
        f: common_vendor.o(($event) => $options.navigateToDetail("write21" + (index + 1)), index)
      });
    })
  } : {}, {
    m: $data.activeDayIndex === 1
  }, $data.activeDayIndex === 1 ? {
    n: common_vendor.f($data.day2Attractions, (item, index, i0) => {
      return common_vendor.e({
        a: common_vendor.t(item.name),
        b: common_vendor.t(item.time),
        c: common_vendor.o(($event) => $options.navigateToMap(item.name), index),
        d: index < $data.day2Attractions.length - 1
      }, index < $data.day2Attractions.length - 1 ? {} : {}, {
        e: index,
        f: common_vendor.o(($event) => $options.navigateToDetail("write22" + (index + 1)), index)
      });
    })
  } : {}, {
    o: $data.activeDayIndex === 2
  }, $data.activeDayIndex === 2 ? {
    p: common_vendor.f($data.day3Attractions, (item, index, i0) => {
      return common_vendor.e({
        a: common_vendor.t(item.name),
        b: common_vendor.t(item.time),
        c: common_vendor.o(($event) => $options.navigateToMap(item.name), index),
        d: index < $data.day3Attractions.length - 1
      }, index < $data.day3Attractions.length - 1 ? {} : {}, {
        e: index,
        f: common_vendor.o(($event) => $options.navigateToDetail("write23" + (index + 1)), index)
      });
    })
  } : {}, {
    q: $data.activeDayIndex === 3
  }, $data.activeDayIndex === 3 ? {
    r: common_vendor.f($data.day4Attractions, (item, index, i0) => {
      return common_vendor.e({
        a: common_vendor.t(item.name),
        b: common_vendor.t(item.time),
        c: common_vendor.o(($event) => $options.navigateToMap(item.name), index),
        d: index < $data.day4Attractions.length - 1
      }, index < $data.day4Attractions.length - 1 ? {} : {}, {
        e: index,
        f: common_vendor.o(($event) => $options.navigateToDetail("write24" + (index + 1)), index)
      });
    })
  } : {}, {
    s: $data.activeDayIndex === 4
  }, $data.activeDayIndex === 4 ? {
    t: common_vendor.t($data.day5Attractions[0].name),
    v: common_vendor.t($data.day5Attractions[0].time),
    w: common_vendor.o(($event) => $options.navigateToMap($data.day5Attractions[0].name)),
    x: common_vendor.o(($event) => $options.navigateToDetail("write251"))
  } : {});
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/travel/looklook2.js.map
