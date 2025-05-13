"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      title: "Hello",
      activeTab: "pending",
      pictures: [
        {
          id: "1",
          url: "https://img2.baidu.com/it/u=3058240186,2670977521&fm=253&fmt=auto&app=138&f=JPEG?w=800&h=800"
        },
        {
          id: "2",
          url: "https://wx2.sinaimg.cn/mw690/008ughm4ly1hj7auni8jhj31rn1rzk5z.jpg"
        },
        {
          id: "3",
          url: "http://img0.baidu.com/it/u=1866569503,1645288747&fm=253&app=138&f=JPEG?w=800&h=800"
        }
      ]
    };
  },
  methods: {
    onPreviewImage(url) {
      common_vendor.index.previewImage({
        urls: this.pictures.map((v) => v.url),
        current: url
      });
    },
    switchTab(tab) {
      this.activeTab = tab;
    },
    navigateToCreateTrip() {
      common_vendor.index.navigateTo({
        url: "/pages/travel/name-trip"
      });
    },
    navigateToLookLook(type) {
      if (type === "wuhan") {
        common_vendor.index.navigateTo({
          url: "/pages/travel/looklook"
        });
      } else if (type === "shanghai") {
        common_vendor.index.navigateTo({
          url: "/pages/travel/looklook2"
        });
      }
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.f($data.pictures, (item, k0, i0) => {
      return {
        a: common_vendor.o(($event) => $options.onPreviewImage(item.url), item.id),
        b: item.url,
        c: item.id
      };
    }),
    b: $data.activeTab === "pending" ? 1 : "",
    c: common_vendor.o(($event) => $options.switchTab("pending")),
    d: $data.activeTab === "finished" ? 1 : "",
    e: common_vendor.o(($event) => $options.switchTab("finished")),
    f: $data.activeTab === "pending"
  }, $data.activeTab === "pending" ? {
    g: common_vendor.o(($event) => $options.navigateToLookLook("wuhan")),
    h: common_vendor.o(($event) => $options.navigateToLookLook("shanghai"))
  } : {}, {
    i: $data.activeTab === "finished"
  }, $data.activeTab === "finished" ? {} : {}, {
    j: $data.activeTab === "pending"
  }, $data.activeTab === "pending" ? {
    k: common_vendor.o((...args) => $options.navigateToCreateTrip && $options.navigateToCreateTrip(...args))
  } : {});
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/travel/travel2.js.map
