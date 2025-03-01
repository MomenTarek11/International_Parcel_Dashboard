import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { AuthenticationService } from "src/app/components/auth/authentication.service";
import { environment } from "src/environments/environment";
declare var $, jQuery: any;

@Component({
  selector: "app-sidebar",
  templateUrl: "./sidebar.component.html",
  styleUrls: ["./sidebar.component.scss"],
})
export class SidebarComponent implements OnInit {
  showSideBar: boolean = true;
  sidebar: any = [];
  user: any;
  filteredSidebar: any;
  remainingSidebar: any;
  constructor(private service: AuthenticationService) {
    this.service.currentUser.subscribe((user) => {
      this.user = user;
      console.log(user);
    });
  }
  totalTags: any = [
    {
      id: 0,
      name: "الطلبات",
      parent: true,
      toggle: false,
      active: { exact: true },
    },
    {
      id: 1,
      name: "إضافة طلب",
      child: true,
      path: "/app/orders/Add",
      active: { exact: true },
    },
    {
      id: 2,
      name: "طلبات لم تدفع بعد",
      child: true,
      path: "/app/orders/waiting",
      active: { exact: true },
    },
    {
      id: 3,
      name: "طلبات جديدة",
      child: true,
      path: "/app/orders/newOrder",
      active: { exact: true },
    },
    {
      id: 4,
      name: "جاري التواصل مع المورد",
      child: true,
      path: "/app/orders/confirmedOrders",
      active: { exact: true },
    },
    {
      id: 5,
      name: "شحنات تحت المراجعة",
      child: true,
      path: "/app/orders/recievedChina",
      active: { exact: true },
    },
    {
      id: 6,
      name: "الطلبات المعلقة",
      child: true,
      path: "/app/orders/inChina",
      active: { exact: true },
    },
    {
      id: 7,
      name: "طلبات جاري شحنها من الصين",
      child: true,
      path: "/app/orders/fromChina",
      active: { exact: true },
    },
    {
      id: 8,
      child: true,
      name: "شحنات في ميناء المملكة تحت المراجعة الجمركية",
      path: "/app/orders/recievedSaudi",
      active: { exact: true },
    },
    {
      id: 9,
      name: "شحنات جاري تفريغها في مستودعاتنا",
      child: true,
      path: "/app/orders/inSaudi",
      active: { exact: true },
    },
    {
      id: 10,
      name: "شحنات جاري توصيلها للعميل",
      child: true,
      path: "/app/orders/fromSaudi",
      active: { exact: true },
    },
    {
      id: 11,
      name: "شحنات منتهية",
      child: true,
      path: "/app/orders/toClient",
      active: { exact: true },
    },
    {
      id: 12,
      name: "شحنات ملغية",
      path: "/app/orders/Finished",
      child: true,
      active: { exact: true },
    },
    {
      id: 13,
      name: "اراء العملاء",
      parent: true,
      toggle: false,
      active: { exact: true },
      children: [
        {
          name: "جميع الاراء",
          path: "/app/testmonials/list",
        },
        {
          name: "اضافة رأي",
          path: "/app/testmonials/add",
        },
      ],
    },
    {
      id: 14,
      name: "البانرات",
      parent: true,
      toggle: false,
      active: { exact: true },
      children: [
        {
          name: "جميع البانرات",
          path: "/app/banner/list",
        },
        {
          name: "اضافة بانر",
          path: "/app/banner/add",
        },
      ],
    },
    {
      id: 15,
      name: "المسؤولين",
      parent: true,
      toggle: false,
      active: { exact: true },
      children: [
        {
          name: "جميع الادمن",
          path: "/app/admins/list",
        },
        {
          name: "اضافة ادمن",
          path: "/app/admins/add",
        },
      ],
    },
    {
      id: 16,
      name: "أنواع الشحنات",
      parent: true,
      toggle: false,
      active: { exact: true },
      children: [
        {
          name: "جميع الشحنات",
          path: "/app/shippment/list",
        },
        {
          name: "اضافة شحنة",
          path: "/app/shippment/add",
        },
      ],
    },
    {
      id: 17,
      name: "العملاء",
      parent: true,
      toggle: false,
      active: { exact: true },
      children: [
        {
          name: "جميع العملاء",
          path: "/app/clients/list",
        },
      ],
    },
    {
      id: 18,
      name: "البروموكود",
      parent: true,
      toggle: false,
      active: { exact: true },
      children: [
        {
          name: "جميع البروموكود",
          path: "/app/promocode/list",
        },
        {
          name: "اضافة بروموكود",
          path: "/app/promocode/add",
        },
      ],
    },
    {
      id: 19,
      name: "التحويلات",
      parent: true,
      toggle: false,
      active: { exact: true },
      children: [
        {
          name: "جميع التحويلات",
          path: "/app/transactions/list",
        },
      ],
    },
    {
      id: 20,
      name: "شريط الأخبار",
      parent: true,
      toggle: false,
      active: { exact: true },
      children: [
        {
          name: "جميع النصوص",
          path: "/app/news/list",
        },
        {
          name: "اضافة نص",
          path: "/app/news/add",
        },
      ],
    },
    {
      id: 21,
      name: "رسائل العملاء",
      parent: true,
      toggle: false,
      active: { exact: true },
      children: [
        {
          name: "جميع الرسائل",
          path: "/app/contact-us/list",
        },
      ],
    },
    {
      id: 22,
      name: "الدول",
      parent: true,
      toggle: false,
      active: { exact: true },
      children: [
        {
          name: "جميع الدول",
          path: "/app/countries",
        },
        {
          name: "اضافة دولة",
          path: "/app/countries/add",
        },
      ],
    },
    {
      id: 23,
      name: "المدن",
      parent: true,
      toggle: false,
      active: { exact: true },
      children: [
        {
          name: "جميع المدن",
          path: "/app/cities",
        },
        {
          name: "اضافة مدينة",
          path: "/app/cities/add",
        },
      ],
    },
  ];
  sidebarIds: any;
  ngOnInit(): void {
    this.sidebarIds = this.user?.data?.permissions || [];

    if (this.sidebarIds.includes("*")) {
      this.sidebar = this.totalTags;
    } else {
      this.sidebar = this.totalTags.filter((tag) =>
        this.sidebarIds.includes(tag.id)
      );
    }
    // Ensure "الطلبات" (Orders) is always included if less than 13 elements
    if (
      this.sidebar.length < 13 &&
      this.sidebar.length > 0 &&
      !this.sidebar.some((tag) => tag.id === 0)
    ) {
      this.sidebar.push(this.totalTags.find((tag) => tag.id === 0));
    }
    // Split sidebar into sections
    this.filteredSidebar = this.sidebar.filter((tag) => tag.id < 13);
    this.remainingSidebar = this.sidebar.filter((tag) => tag.id >= 13);
    localStorage.setItem("sidebar", JSON.stringify(this.sidebar));
    console.log(this.sidebar);
  }

  toggler() {
    this.showSideBar = !this.showSideBar;
  }
  toggleMenu(item: any) {
    if (item.parent) {
      item.toggle = !item.toggle;
    }
  }
}
