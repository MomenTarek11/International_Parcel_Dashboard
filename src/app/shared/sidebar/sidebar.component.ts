import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { environment } from "src/environments/environment";
declare var $, jQuery: any;

@Component({
  selector: "app-sidebar",
  templateUrl: "./sidebar.component.html",
  styleUrls: ["./sidebar.component.scss"],
})
export class SidebarComponent implements OnInit {
  permissions = JSON.parse(
    localStorage.getItem(`${environment.currentUserKey}`)
  );
  shippmentPrice = 0;
  orders = 0;
  orders1_1 = 0;
  orders1_2 = 0;
  orders1_3 = 0;
  orders1 = 0;
  orders2 = 0;
  orders3 = 0;
  orders4 = 0;
  orders5 = 0;
  orders6 = 0;
  orders7 = 0;
  orders8 = 0;
  orders9 = 0;
  orders10 = 0;

  priceOffer = 0;
  testmonial = 0;
  services = 0;
  banners = 0;
  admins = 0;
  clients = 0;
  transaction = 0;
  promocode = 0;
  types = 0;
  news = 0;
  messages = 0;
  countries = 0;
  cities = 0;

  constructor() {}
  ngOnInit(): void {
    for (let i = 0; i < this.permissions.data.user.sections.length; i++) {
      if (this.permissions.data.user.sections[i] == "اسعار الشحن الدولى") {
        this.shippmentPrice = 1;
      }
      if (this.permissions.data.user.sections[i] == "إضافة طلب") {
        this.orders1_1 = 1;
        this.orders1 = 1;
      }
      if (this.permissions.data.user.sections[i] == "طلبات لم تدفع بعد") {
        this.orders1_2 = 1;
        this.orders1 = 1;
      }
      if (this.permissions.data.user.sections[i] == "الطلبات") {
        this.orders1 = 1;
      }
      if (this.permissions.data.user.sections[i] == "الطلبات-طلبات جديدة") {
        this.orders1_3 = 1;
        this.orders1 = 1;
      }
      if (
        this.permissions.data.user.sections[i] ==
        "الطلبات-جاري التواصل مع المورد"
      ) {
        this.orders1 = 1;
        this.orders2 = 1;
      }
      if (
        this.permissions.data.user.sections[i] == "الطلبات-شحنات تحت المراجعة"
      ) {
        this.orders1 = 1;
        this.orders3 = 1;
      }
      if (this.permissions.data.user.sections[i] == "الطلبات-الطلبات المعلقة") {
        this.orders1 = 1;
        this.orders4 = 1;
      }
      if (
        this.permissions.data.user.sections[i] == "الطلبات-جاري شحنها من الصين"
      ) {
        this.orders1 = 1;
        this.orders5 = 1;
      }
      if (
        this.permissions.data.user.sections[i] ==
        "الطلبات-شحنات في ميناء المملكة تحت المراجعة الجمركية"
      ) {
        this.orders1 = 1;
        this.orders6 = 1;
      }
      if (
        this.permissions.data.user.sections[i] ==
        "الطلبات-شحنات جاري تفريغها في مستودعاتنا"
      ) {
        this.orders1 = 1;
        this.orders7 = 1;
      }
      if (
        this.permissions.data.user.sections[i] ==
        "الطلبات-شحنات جاري توصيلها للعميل"
      ) {
        this.orders1 = 1;
        this.orders8 = 1;
      }
      if (this.permissions.data.user.sections[i] == "الطلبات-شحنات منتهية") {
        this.orders1 = 1;
        this.orders9 = 1;
      }
      if (this.permissions.data.user.sections[i] == "الطلبات-شحنات ملغية") {
        this.orders1 = 1;
        this.orders10 = 1;
      }

      if (this.permissions.data.user.sections[i] == "عروض الاسعار") {
        this.priceOffer = 1;
      }
      if (this.permissions.data.user.sections[i] == "اراء العملاء") {
        this.testmonial = 1;
      }
      if (this.permissions.data.user.sections[i] == "الخدمات") {
        this.services = 1;
      }
      if (this.permissions.data.user.sections[i] == "البانرات") {
        this.banners = 1;
      }
      if (this.permissions.data.user.sections[i] == "الادمن") {
        this.admins = 1;
      }
      if (this.permissions.data.user.sections[i] == "العملاء") {
        this.clients = 1;
      }
      if (this.permissions.data.user.sections[i] == "البروموكود") {
        this.promocode = 1;
      }
      if (this.permissions.data.user.sections[i] == "التحويلات") {
        this.transaction = 1;
      }
      if (this.permissions.data.user.sections[i] == "انواع الشحنات") {
        this.types = 1;
      }
      if (this.permissions.data.user.sections[i] == "شريط الأخبار") {
        this.news = 1;
      }
      if (this.permissions.data.user.sections[i] == "رسائل العملاء") {
        this.messages = 1;
      }
      if (this.permissions.data.user.sections[i] == "الدول") {
        this.countries = 1;
      }
      if (this.permissions.data.user.sections[i] == "المدن") {
        this.cities = 1;
      }
    }
    console.log(this.permissions.data.user.sections);
    // left sidebar and vertical menu
    if ($("#pageWrapper").hasClass("compact-wrapper")) {
      jQuery(".sidebar-title").append(
        '<div class="according-menu"><i class="fa fa-angle-right"></i></div>'
      );
      jQuery(".sidebar-title").click(function () {
        jQuery(".sidebar-title")
          .removeClass("active")
          .find("div")
          .replaceWith(
            '<div class="according-menu"><i class="fa fa-angle-right"></i></div>'
          );
        jQuery(".sidebar-submenu, .menu-content").slideUp("normal");
        jQuery(".menu-content").slideUp("normal");
        if (jQuery(this).next().is(":hidden") == true) {
          jQuery(this).addClass("active");
          jQuery(this)
            .find("div")
            .replaceWith(
              '<div class="according-menu"><i class="fa fa-angle-down"></i></div>'
            );
          jQuery(this).next().slideDown("normal");
        } else {
          jQuery(this)
            .find("div")
            .replaceWith(
              '<div class="according-menu"><i class="fa fa-angle-right"></i></div>'
            );
        }
      });
      jQuery(".sidebar-submenu, .menu-content").hide();
      jQuery(".submenu-title").append(
        '<div class="according-menu"><i class="fa fa-angle-right"></i></div>'
      );
      jQuery(".submenu-title").click(function () {
        jQuery(".submenu-title")
          .removeClass("active")
          .find("div")
          .replaceWith(
            '<div class="according-menu"><i class="fa fa-angle-right"></i></div>'
          );
        jQuery(".submenu-content").slideUp("normal");
        if (jQuery(this).next().is(":hidden") == true) {
          jQuery(this).addClass("active");
          jQuery(this)
            .find("div")
            .replaceWith(
              '<div class="according-menu"><i class="fa fa-angle-down"></i></div>'
            );
          jQuery(this).next().slideDown("normal");
        } else {
          jQuery(this)
            .find("div")
            .replaceWith(
              '<div class="according-menu"><i class="fa fa-angle-right"></i></div>'
            );
        }
      });
      jQuery(".submenu-content").hide();
    } else if ($("#pageWrapper").hasClass("horizontal-wrapper")) {
      var contentwidth = jQuery(window).width();
      if (contentwidth < "992") {
        $("#pageWrapper")
          .removeClass("horizontal-wrapper")
          .addClass("compact-wrapper");
        $(".page-body-wrapper")
          .removeClass("horizontal-menu")
          .addClass("sidebar-icon");
        jQuery(".submenu-title").append(
          '<div class="according-menu"><i class="fa fa-angle-right"></i></div>'
        );
        jQuery(".submenu-title").click(function () {
          jQuery(".submenu-title").removeClass("active");
          jQuery(".submenu-title")
            .find("div")
            .replaceWith(
              '<div class="according-menu"><i class="fa fa-angle-right"></i></div>'
            );
          jQuery(".submenu-content").slideUp("normal");
          if (jQuery(this).next().is(":hidden") == true) {
            jQuery(this).addClass("active");
            jQuery(this)
              .find("div")
              .replaceWith(
                '<div class="according-menu"><i class="fa fa-angle-down"></i></div>'
              );
            jQuery(this).next().slideDown("normal");
          } else {
            jQuery(this)
              .find("div")
              .replaceWith(
                '<div class="according-menu"><i class="fa fa-angle-right"></i></div>'
              );
          }
        });
        jQuery(".submenu-content").hide();

        jQuery(".sidebar-title").append(
          '<div class="according-menu"><i class="fa fa-angle-right"></i></div>'
        );
        jQuery(".sidebar-title").click(function () {
          jQuery(".sidebar-title").removeClass("active");
          jQuery(".sidebar-title")
            .find("div")
            .replaceWith(
              '<div class="according-menu"><i class="fa fa-angle-right"></i></div>'
            );
          jQuery(".sidebar-submenu, .menu-content").slideUp("normal");
          if (jQuery(this).next().is(":hidden") == true) {
            jQuery(this).addClass("active");
            jQuery(this)
              .find("div")
              .replaceWith(
                '<div class="according-menu"><i class="fa fa-angle-down"></i></div>'
              );
            jQuery(this).next().slideDown("normal");
          } else {
            jQuery(this)
              .find("div")
              .replaceWith(
                '<div class="according-menu"><i class="fa fa-angle-right"></i></div>'
              );
          }
        });
        jQuery(".sidebar-submenu, .menu-content").hide();
      }
    }
  }
  toggler() {
    jQuery(".sidebar-main").toggleClass("hide");
    if (jQuery(".sidebar-main").hasClass("hide")) {
      jQuery(
        ".page-wrapper.compact-wrapper .page-body-wrapper.sidebar-icon .page-body"
      ).css("margin-right", "0");
    } else {
      jQuery(
        ".page-wrapper.compact-wrapper .page-body-wrapper.sidebar-icon .page-body"
      ).css("margin-right", "280px");
    }
    // if(jQuery(''))
    // jQuery()
  }
}
