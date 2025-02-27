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
      id: 1,
      name: "الطلبات",
      parent: true,
      toggle: false,
      active: { exact: true },
    },
    {
      id: 2,
      name: "إضافة طلب",
      child: true,
      path: "/app/orders/Add",
      active: { exact: true },
    },
    {
      id: 3,
      name: "طلبات لم تدفع بعد",
      child: true,
      path: "/app/orders/waiting",
      active: { exact: true },
    },
    {
      id: 4,
      name: "طلبات جديدة",
      child: true,
      path: "/app/orders/newOrder",
      active: { exact: true },
    },
    {
      id: 5,
      name: "جاري التواصل مع المورد",
      child: true,
      path: "/app/orders/confirmedOrders",
      active: { exact: true },
    },
    {
      id: 6,
      name: "شحنات تحت المراجعة",
      child: true,
      path: "/app/orders/recievedChina",
      active: { exact: true },
    },
    {
      id: 7,
      name: "الطلبات المعلقة",
      child: true,
      path: "/app/orders/inChina",
      active: { exact: true },
    },
    {
      id: 8,
      name: "طلبات جاري شحنها من الصين",
      child: true,
      path: "/app/orders/fromChina",
      active: { exact: true },
    },
    {
      id: 9,
      child: true,
      name: "شحنات في ميناء المملكة تحت المراجعة الجمركية",
      path: "/app/orders/recievedSaudi",
      active: { exact: true },
    },
    {
      id: 10,
      name: "شحنات جاري تفريغها في مستودعاتنا",
      child: true,
      path: "/app/orders/inSaudi",
      active: { exact: true },
    },
    {
      id: 11,
      name: "شحنات جاري توصيلها للعميل",
      child: true,
      path: "/app/orders/fromSaudi",
      active: { exact: true },
    },
    {
      id: 12,
      name: "شحنات منتهية",
      child: true,
      path: "/app/orders/toClient",
      active: { exact: true },
    },
    {
      id: 13,
      name: "شحنات ملغية",
      path: "/app/orders/Finished",
      child: true,
      active: { exact: true },
    },
    {
      id: 14,
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
      id: 15,
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
      id: 16,
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
      id: 17,
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
      id: 18,
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
      id: 19,
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
      id: 20,
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
      id: 21,
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
      id: 22,
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
      id: 23,
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
      id: 24,
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
    // if (this.user.permissions?.length > 0) {
    //   if (this.user.permissions[0] == "*") {
    //     this.sidebar = this.totalTags;
    //     localStorage.setItem("sidebar", JSON.stringify(this.sidebar));
    //   } else {
    //     this.sidebar = [
    //       this.totalTags[0],
    //       ...this.totalTags.filter((item: any) => {
    //         return (
    //           this.user.permissions.includes(item.id) &&
    //           item.id !== this.totalTags[0].id
    //         );
    //       }),
    //     ];
    //     localStorage.setItem("sidebar", JSON.stringify(this.sidebar));
    //   }
    // }
    this.sidebarIds = [5, 17, 23, 24];
    if (this.sidebarIds.length < 13) {
      this.sidebarIds.push(1);
    }
    this.sidebar = this.totalTags.filter((tag) =>
      this.sidebarIds.includes(tag.id)
    );
    this.filteredSidebar = this.sidebar.filter((i: any) => i.id < 13);
    this.remainingSidebar = this.sidebar.filter((i: any) => i.id >= 13); // Second Section
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
