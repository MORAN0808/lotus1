"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      activeDayIndex: 0,
      day1Attractions: [
        { name: "汉口江滩", time: "6:30-7:30" },
        { name: "江汉路", time: "8:30-12:00" },
        { name: "武汉大学", time: "14:00-15:30" },
        { name: "光谷", time: "16:00-19:30" },
        { name: "财大小吃街", time: "20:00-22:00" }
      ],
      day2Attractions: [
        { name: "东湖", time: "6:30-7:30" },
        { name: "昙华林", time: "8:30-12:00" },
        { name: "楚河韩姐", time: "14:00-15:30" },
        { name: "黄鹤楼", time: "16:00-19:30" },
        { name: "武汉站", time: "20:00-22:00" }
      ]
    };
  },
  methods: {
    switchDay(index) {
      this.activeDayIndex = index;
    },
    navigateToMap(placeName) {
      common_vendor.wx$1.getLocation({
        type: "gcj02",
        success(res) {
          const { latitude, longitude } = res;
          const params = {
            "from[name]": "我的位置",
            "from[id]": "dirmyloc",
            // 固定标识当前位置
            "from[lnglat]": `${longitude},${latitude}`,
            "to[name]": placeName,
            "to[lnglat]": "",
            // 留空由高德自动解析
            "type": "car",
            // 交通方式
            "policy": "1"
            // 路线策略
          };
          const queryString = Object.keys(params).map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`).join("&");
          const mapUrl = `https://ditu.amap.com/dir?${queryString}`;
          common_vendor.wx$1.setClipboardData({
            data: mapUrl,
            success() {
              common_vendor.wx$1.showToast({
                title: "导航链接已复制，请复制到浏览器或者高德地图打开",
                icon: "none"
              });
            }
          });
        },
        fail(err) {
          common_vendor.index.__f__("error", "at pages/travel/looklook.vue:138", "获取位置失败", err);
          common_vendor.wx$1.showToast({
            title: "获取位置失败，请检查定位权限",
            icon: "none"
          });
        }
      });
    },
    navigateToDetail(dayIndex, attractionIndex) {
      const pageNumber = attractionIndex + 1;
      const pagePath = `/pages/write${dayIndex + 1}${pageNumber}/write${dayIndex + 1}${pageNumber}`;
      common_vendor.index.navigateTo({
        url: pagePath,
        fail: () => {
          common_vendor.index.showToast({
            title: "页面跳转失败",
            icon: "none"
          });
        }
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
    e: $data.activeDayIndex === 0
  }, $data.activeDayIndex === 0 ? {
    f: common_vendor.f($data.day1Attractions, (item, index, i0) => {
      return common_vendor.e({
        a: common_vendor.t(item.name),
        b: common_vendor.t(item.time),
        c: common_vendor.o(($event) => $options.navigateToMap(item.name), index),
        d: common_vendor.o(($event) => $options.navigateToDetail(0, index), index),
        e: index < $data.day1Attractions.length - 1
      }, index < $data.day1Attractions.length - 1 ? {} : {}, {
        f: index
      });
    })
  } : {}, {
    g: $data.activeDayIndex === 1
  }, $data.activeDayIndex === 1 ? {
    h: common_vendor.f($data.day2Attractions, (item, index, i0) => {
      return common_vendor.e({
        a: common_vendor.t(item.name),
        b: common_vendor.t(item.time),
        c: common_vendor.o(($event) => $options.navigateToMap(item.name), index),
        d: common_vendor.o(($event) => $options.navigateToDetail(1, index), index),
        e: index < $data.day2Attractions.length - 1
      }, index < $data.day2Attractions.length - 1 ? {} : {}, {
        f: index
      });
    })
  } : {});
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/travel/looklook.js.map
