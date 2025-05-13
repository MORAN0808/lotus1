"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  __name: "money2",
  setup(__props) {
    const activeTab = common_vendor.ref("明细");
    const bills = common_vendor.ref([
      {
        id: 1,
        date: "2025-05-05",
        type: "expense",
        category: "餐饮",
        subCategory: "",
        amount: 41
      },
      {
        id: 2,
        date: "2025-05-04",
        type: "income",
        category: "其它收入",
        subCategory: "",
        amount: 300
      },
      {
        id: 3,
        date: "2025-05-03",
        type: "expense",
        category: "购物",
        subCategory: "",
        amount: 100
      },
      {
        id: 4,
        date: "2025-05-02",
        type: "income",
        category: "其它收入",
        subCategory: "转账",
        amount: 150
      },
      {
        id: 5,
        date: "2025-05-01",
        type: "expense",
        category: "娱乐",
        subCategory: "",
        amount: 50
      }
      /*
          {
            id: 6,
            date: '2025-05-01',
            type: 'expense',
            category: '餐饮',
            subCategory: '水果',
            amount: 20
          },
      */
    ]);
    const groupedBills = common_vendor.computed(() => {
      return bills.value.reduce((groups, bill) => {
        const date = bill.date;
        if (!groups[date])
          groups[date] = [];
        groups[date].push(bill);
        return groups;
      }, {});
    });
    const formatDate = (dateStr) => {
      const date = new Date(dateStr);
      const options = {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        weekday: "long"
      };
      return date.toLocaleDateString("zh-CN", options).replace(/\//g, "-");
    };
    const navigateToMoney = () => {
      common_vendor.index.navigateTo({
        url: "/pages/money/mymoney"
        // 确保路径正确且页面存在
      });
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(groupedBills.value, (group, date, i0) => {
          return {
            a: common_vendor.t(formatDate(date)),
            b: common_vendor.f(group, (bill, k1, i1) => {
              return {
                a: common_vendor.t(bill.category),
                b: common_vendor.t(bill.subCategory),
                c: common_vendor.t(bill.type === "income" ? "+" : "-"),
                d: common_vendor.t(bill.amount),
                e: common_vendor.n(bill.type),
                f: bill.id
              };
            }),
            c: date
          };
        }),
        b: common_vendor.o(navigateToMoney),
        c: common_vendor.f(_ctx.tabs, (tab, k0, i0) => {
          return {
            a: common_vendor.t(tab),
            b: tab,
            c: common_vendor.n({
              active: activeTab.value === tab
            }),
            d: common_vendor.o(($event) => activeTab.value = tab, tab)
          };
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-1e8c6b89"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/money/money2.js.map
