"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    const today = /* @__PURE__ */ new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);
    return {
      trip: {
        id: null,
        name: "",
        city: "",
        startDate: this.formatDate(today),
        endDate: this.formatDate(tomorrow),
        days: []
      },
      activeDayIndex: 0
    };
  },
  onLoad(options) {
    var _a;
    try {
      const trips = common_vendor.index.getStorageSync("trips") || [];
      const tripId = options.id;
      if (tripId) {
        const foundTrip = trips.find((trip) => trip.id == tripId);
        if (foundTrip) {
          this.trip = {
            ...this.trip,
            ...foundTrip,
            days: ((_a = foundTrip.days) == null ? void 0 : _a.map((day) => ({
              day: day.day,
              attractions: day.attractions || []
            }))) || []
          };
        }
      }
      if (this.trip.days.length === 0) {
        this.addDay();
      }
    } catch (e) {
      common_vendor.index.__f__("error", "at pages/travel/detail-trip.vue:120", "加载行程数据失败:", e);
      this.addDay();
    }
  },
  computed: {
    activeDay() {
      if (this.activeDayIndex == null || !Array.isArray(this.trip.days) || this.activeDayIndex < 0 || this.activeDayIndex >= this.trip.days.length) {
        return null;
      }
      return this.trip.days[this.activeDayIndex];
    }
  },
  methods: {
    formatDate(date) {
      if (!(date instanceof Date)) {
        date = /* @__PURE__ */ new Date();
      }
      const year = date.getFullYear();
      const month = (date.getMonth() + 1).toString().padStart(2, "0");
      const day = date.getDate().toString().padStart(2, "0");
      return `${year}-${month}-${day}`;
    },
    switchDay(index) {
      if (index >= 0 && index < this.trip.days.length) {
        this.activeDayIndex = index;
      }
    },
    startDateChange(e) {
      if (e.detail.value) {
        this.trip.startDate = e.detail.value;
        if (new Date(this.trip.startDate) > new Date(this.trip.endDate)) {
          this.trip.endDate = this.trip.startDate;
        }
        this.adjustDays();
      }
    },
    endDateChange(e) {
      if (e.detail.value) {
        this.trip.endDate = e.detail.value;
        if (new Date(this.trip.endDate) < new Date(this.trip.startDate)) {
          this.trip.startDate = this.trip.endDate;
        }
        this.adjustDays();
      }
    },
    adjustDays() {
      try {
        const startDate = new Date(this.trip.startDate);
        const endDate = new Date(this.trip.endDate);
        const daysBetween = Math.ceil((endDate - startDate) / (1e3 * 60 * 60 * 24)) + 1;
        if (!Array.isArray(this.trip.days)) {
          this.trip.days = [];
        }
        while (this.trip.days.length < daysBetween) {
          this.addDay();
        }
        while (this.trip.days.length > daysBetween) {
          this.trip.days.pop();
        }
        this.trip.days.forEach((day, index) => {
          if (day) {
            day.day = index + 1;
          }
        });
        if (this.activeDayIndex >= this.trip.days.length) {
          this.activeDayIndex = Math.max(0, this.trip.days.length - 1);
        }
      } catch (e) {
        common_vendor.index.__f__("error", "at pages/travel/detail-trip.vue:200", "调整天数失败:", e);
      }
    },
    addDay() {
      if (!Array.isArray(this.trip.days)) {
        this.trip.days = [];
      }
      const newDay = {
        day: this.trip.days.length + 1,
        attractions: []
      };
      this.trip.days.push(newDay);
      this.activeDayIndex = this.trip.days.length - 1;
      try {
        const startDate = new Date(this.trip.startDate);
        const newEndDate = new Date(startDate);
        newEndDate.setDate(startDate.getDate() + this.trip.days.length - 1);
        this.trip.endDate = this.formatDate(newEndDate);
      } catch (e) {
        common_vendor.index.__f__("error", "at pages/travel/detail-trip.vue:222", "更新结束日期失败:", e);
      }
    },
    addAttraction(dayIndex) {
      if (dayIndex >= 0 && dayIndex < this.trip.days.length) {
        if (!Array.isArray(this.trip.days[dayIndex].attractions)) {
          this.trip.days[dayIndex].attractions = [];
        }
        this.trip.days[dayIndex].attractions.push({
          name: "",
          startTime: "",
          endTime: ""
        });
      }
    },
    removeAttraction(dayIndex, attractionIndex) {
      var _a;
      if (dayIndex >= 0 && dayIndex < this.trip.days.length && attractionIndex >= 0 && attractionIndex < ((_a = this.trip.days[dayIndex].attractions) == null ? void 0 : _a.length)) {
        this.trip.days[dayIndex].attractions.splice(attractionIndex, 1);
      }
    },
    timeChange(dayIndex, attractionIndex, type, e) {
      var _a;
      if (dayIndex >= 0 && dayIndex < this.trip.days.length && attractionIndex >= 0 && attractionIndex < ((_a = this.trip.days[dayIndex].attractions) == null ? void 0 : _a.length) && e.detail.value) {
        if (type === "startTime") {
          this.trip.days[dayIndex].attractions[attractionIndex].startTime = e.detail.value;
        } else {
          this.trip.days[dayIndex].attractions[attractionIndex].endTime = e.detail.value;
        }
      }
    },
    async saveTrip() {
      try {
        const trips = common_vendor.index.getStorageSync("trips") || [];
        const tripIndex = trips.findIndex((trip) => trip.id == this.trip.id);
        const tripToSave = {
          ...this.trip,
          days: this.trip.days.map((day) => ({
            day: day.day,
            attractions: day.attractions || []
          }))
        };
        if (tripIndex !== -1) {
          trips[tripIndex] = tripToSave;
        } else {
          tripToSave.id = tripToSave.id || Date.now();
          trips.push(tripToSave);
        }
        await common_vendor.index.setStorageSync("trips", trips);
        common_vendor.index.showToast({
          title: "保存成功",
          icon: "success"
        });
        setTimeout(() => {
          common_vendor.index.redirectTo({
            url: "/pages/travel/travel2"
          });
        }, 2e3);
      } catch (e) {
        common_vendor.index.__f__("error", "at pages/travel/detail-trip.vue:287", "保存行程失败:", e);
        common_vendor.index.showToast({
          title: "保存失败",
          icon: "error"
        });
      }
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.t($data.trip.name || "未命名行程"),
    b: common_vendor.t($data.trip.startDate || "选择日期"),
    c: $data.trip.startDate,
    d: common_vendor.o((...args) => $options.startDateChange && $options.startDateChange(...args)),
    e: common_vendor.t($data.trip.endDate || "选择日期"),
    f: $data.trip.endDate,
    g: common_vendor.o((...args) => $options.endDateChange && $options.endDateChange(...args)),
    h: common_vendor.f($data.trip.days, (day, index, i0) => {
      return {
        a: common_vendor.t((day == null ? void 0 : day.day) ?? index + 1),
        b: index,
        c: $data.activeDayIndex === index ? 1 : "",
        d: common_vendor.o(($event) => $options.switchDay(index), index)
      };
    }),
    i: $options.activeDay
  }, $options.activeDay ? {
    j: common_vendor.t($options.activeDay.day),
    k: common_vendor.o(($event) => $options.addAttraction($data.activeDayIndex)),
    l: common_vendor.f($options.activeDay.attractions, (attraction, attractionIndex, i0) => {
      return {
        a: attraction.name,
        b: common_vendor.o(($event) => attraction.name = $event.detail.value, attractionIndex),
        c: common_vendor.t(attraction.startTime || "选择到达时间"),
        d: attraction.startTime,
        e: common_vendor.o(($event) => $options.timeChange($data.activeDayIndex, attractionIndex, "startTime", $event), attractionIndex),
        f: common_vendor.t(attraction.endTime || "选择结束时间"),
        g: attraction.endTime,
        h: common_vendor.o(($event) => $options.timeChange($data.activeDayIndex, attractionIndex, "endTime", $event), attractionIndex),
        i: common_vendor.o(($event) => $options.removeAttraction($data.activeDayIndex, attractionIndex), attractionIndex),
        j: attractionIndex
      };
    })
  } : {}, {
    m: common_vendor.o((...args) => $options.addDay && $options.addDay(...args)),
    n: common_vendor.o((...args) => $options.saveTrip && $options.saveTrip(...args))
  });
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/travel/detail-trip.js.map
