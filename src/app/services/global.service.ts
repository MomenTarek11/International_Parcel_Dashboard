import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class GlobalService {
  constructor(private http: HttpClient) {}

  addTestmonials(f) {
    return this.http.post(
      `${environment.endpoint}/backend/testimonials/create`,
      f
    );
  }
  getTestmonials() {
    return this.http.get(`${environment.endpoint}/backend/testimonials`);
  }
  addToTestmonials(id) {
    const formData = new FormData();

    formData.append("rating_id", id.rating_id);
    formData.append("in_home", id.in_home);
    return this.http.post(
      `${environment.endpoint}/backend/ratings/in-home`,
      formData
    );
  }

  DeleteTest(id) {
    return this.http.get(
      `${environment.endpoint}/backend/testimonials/delete?testimonial_id=${id}`
    );
  }
  editTest(f) {
    return this.http.post(
      `${environment.endpoint}/backend/testimonials/edit`,
      f
    );
  }

  addService(f) {
    const formData = new FormData();
    formData.append("title_ar", f.title_ar);
    formData.append("title_en", f.title_en);
    formData.append("description_en", f.description_en);
    formData.append("description_ar", f.description_ar);
    formData.append("image", f.image);

    return this.http.post(
      `${environment.endpoint}/backend/services/create`,
      formData
    );
  }

  getServices() {
    return this.http.get(`${environment.endpoint}/backend/services`);
  }

  deleteService(id) {
    return this.http.get(
      `${environment.endpoint}/backend/services/delete?service_id=${id}`
    );
  }
  editService(f) {
    const formData = new FormData();
    formData.append("title_ar", f.title_ar);
    formData.append("title_en", f.title_en);
    formData.append("description_en", f.description_en);
    formData.append("description_ar", f.description_ar);
    formData.append("service_id", f.service_id);

    if (f.image !== undefined) {
      formData.append("image", f.image);
    }
    return this.http.post(
      `${environment.endpoint}/backend/services/edit`,
      formData
    );
  }

  addBanners(f) {
    const formData = new FormData();
    formData.append("image", f.image);
    return this.http.post(
      `${environment.endpoint}/backend/banners/create`,
      formData
    );
  }

  getBanners() {
    return this.http.get(`${environment.endpoint}/backend/banners`);
  }

  getmessages(page) {
    return this.http.get(
      `${environment.endpoint}/backend/contacts?page=${page}`
    );
  }

  getNews() {
    return this.http.get(`${environment.endpoint}/backend/news`);
  }

  addNews(news) {
    return this.http.post(`${environment.endpoint}/backend/news/create`, news);
  }

  updateNews(news) {
    return this.http.post(`${environment.endpoint}/backend/news/edit`, news);
  }

  deleteNews(id) {
    return this.http.get(
      `${environment.endpoint}/backend/news/delete?news_id=${id}`
    );
  }

  getAllShipmentTypes() {
    return this.http.get(`${environment.endpoint}/backend/shipment_types`);
  }

  deleteAllShipmentTypes(id) {
    return this.http.get(
      `${environment.endpoint}/backend/delete?shipment_type_id=${id}`
    );
  }

  editShipmentType(form) {
    return this.http.post(
      `${environment.endpoint}/backend/shipment_types/edit`,
      form
    );
  }

  addShipmentType(form) {
    return this.http.post(
      `${environment.endpoint}/backend/shipment_types/create`,
      form
    );
  }

  deleteBanners(id) {
    return this.http.get(
      `${environment.endpoint}/backend/banners/delete?banner_id=${id}`
    );
  }
  editBanners(f) {
    const formData = new FormData();
    // formData.append('title_ar',f.title_ar)
    // formData.append('title_en',f.title_en)
    // formData.append('description_en',f.description_en)
    // formData.append('description_ar',f.description_ar)
    formData.append("banner_id", f.banner_id);

    if (f.image !== undefined) {
      formData.append("image", f.image);
    }
    return this.http.post(
      `${environment.endpoint}/backend/banners/edit`,
      formData
    );
  }

  addCompany(f) {
    const formData = new FormData();
    formData.append("name_ar", f.name_ar);
    formData.append("name_en", f.name_en);
    formData.append("description_en", f.description_en);
    formData.append("description_ar", f.description_ar);
    formData.append("image", f.image);

    return this.http.post(
      `${environment.endpoint}/backend/companies/create`,
      formData
    );
  }

  getCompanies() {
    return this.http.get(`${environment.endpoint}/backend/companies`);
  }

  deleteCompany(id) {
    return this.http.get(
      `${environment.endpoint}/backend/companies/delete?company_id=${id}`
    );
  }
  editCompany(f) {
    const formData = new FormData();
    formData.append("name_ar", f.name_ar);
    formData.append("name_en", f.name_en);
    formData.append("description_en", f.description_en);
    formData.append("description_ar", f.description_ar);
    formData.append("company_id", f.company_id);

    if (f.image !== undefined) {
      formData.append("image", f.image);
    }
    return this.http.post(
      `${environment.endpoint}/backend/companies/edit`,
      formData
    );
  }

  addinterNationalCompany(f) {
    const formData = new FormData();
    formData.append("name_ar", f.name_ar);
    formData.append("name_en", f.name_en);
    formData.append("description_en", f.description_en);
    formData.append("description_ar", f.description_ar);
    formData.append("image", f.image);
    formData.append("price", f.price);
    formData.append("insaurance", f.insaurance);

    return this.http.post(
      `${environment.endpoint}/backend/international_companies/create`,
      formData
    );
  }

  getinterNationalCompanies() {
    return this.http.get(
      `${environment.endpoint}/backend/international_companies`
    );
  }

  deleteinterNationalCompany(id) {
    return this.http.get(
      `${environment.endpoint}/backend/international_companies/delete?company_id=${id}`
    );
  }
  editinterNationalCompany(f) {
    const formData = new FormData();
    formData.append("name_ar", f.name_ar);
    formData.append("name_en", f.name_en);
    formData.append("description_en", f.description_en);
    formData.append("description_ar", f.description_ar);
    formData.append("image", f.image);
    formData.append("price", f.price);
    formData.append("insaurance", f.insaurance);
    formData.append("company_id", f.company_id);

    if (f.image !== undefined) {
      formData.append("image", f.image);
    }
    return this.http.post(
      `${environment.endpoint}/backend/international_companies/edit`,
      formData
    );
  }

  addsaudiHarbour(f) {
    return this.http.post(
      `${environment.endpoint}/backend/saudi_harbors/create`,
      f
    );
  }

  getsaudiHarbour() {
    return this.http.get(`${environment.endpoint}/backend/saudi_harbors`);
  }

  deletesaudiHarbour(id) {
    return this.http.get(
      `${environment.endpoint}/backend/saudi_harbors/delete?saudi_harbor_id=${id}`
    );
  }
  editsaudiHarbour(f) {
    return this.http.post(
      `${environment.endpoint}/backend/saudi_harbors/edit`,
      f
    );
  }

  addchinaHarbour(f) {
    return this.http.post(
      `${environment.endpoint}/backend/china_harbors/create`,
      f
    );
  }

  getchinaHarbour() {
    return this.http.get(`${environment.endpoint}/backend/china_harbors`);
  }

  deletechinaHarbour(id) {
    return this.http.get(
      `${environment.endpoint}/backend/china_harbors/delete?china_harbor_id=${id}`
    );
  }
  editchinaHarbour(f) {
    return this.http.post(
      `${environment.endpoint}/backend/china_harbors/edit`,
      f
    );
  }

  addAdmin(f) {
    console.log(f);
    const formData = new FormData();
    console.log(f.sections[0]);
    formData.append("name", f.name);
    formData.append("email", f.email);
    formData.append("password", f.password);
    formData.append("confirm_password", f.confirm_password);
    formData.append("image", f.image);
    formData.append("role", f.role);

    for (let i = 0; i < f.sections.length; i++) {
      formData.append(`sections[${i}]`, f.sections[i].section_name);
    }
    // console.log(...formData)
    return this.http.post(
      `${environment.endpoint}/backend/backend_admins/create`,
      formData
    );
  }

  editAdmin(f) {
    const formData = new FormData();
    formData.append("name", f.name);
    formData.append("email", f.email);
    formData.append("admin_id", f.admin_id);
    formData.append("role", f.role);

    if (f.password !== undefined) {
      formData.append("password", f.password);
    }
    if (f.image !== undefined) {
      formData.append("image", f.image);
    }
    if (f.sections.length > 0) {
      for (let i = 0; i < f.sections.length; i++) {
        formData.append(`sections[${i}]`, f.sections[i].section_name);
      }
    }
    return this.http.post(
      `${environment.endpoint}/backend/admins/edit`,
      formData
    );
  }

  allAdmins() {
    return this.http.get(`${environment.endpoint}/backend/backend_admins`);
  }
  deleteAdmin(id) {
    return this.http.get(
      `${environment.endpoint}/backend/admins/delete?admin_id=${id}`
    );
  }

  addShippment(f) {
    const formData = new FormData();
    formData.append("name_ar", f.name_ar);
    formData.append("name_en", f.name_en);

    return this.http.post(
      `${environment.endpoint}/backend/shipment_types/create`,
      formData
    );
  }

  editShippment(f) {
    const formData = new FormData();
    formData.append("name_ar", f.name_ar);
    formData.append("name_en", f.name_en);
    formData.append("shipment_type_id", f.shipment_type_id);

    return this.http.post(
      `${environment.endpoint}/backend/shipment_types/edit`,
      formData
    );
  }
  allShippment() {
    return this.http.get(`${environment.endpoint}/backend/shipment_types`);
  }
  deleteShippment(id) {
    return this.http.get(
      `${environment.endpoint}/backend/shipment_types/delete?shipment_type_id=${id}`
    );
  }

  getClients(active, page = 1) {
    return this.http.get(
      `${environment.endpoint}/backend/clients?active=${active}&page=${page}`
    );
  }

  changeStatus(user_id, status) {
    return this.http.post(
      `${environment.endpoint}/backend/clients/active?user_id=${user_id}&active=${status}`,
      {}
    );
  }

  getOrders(
    company_id,
    status,
    changed = 0,
    accept = 0,
    canceled = 0,
    page = 1
  ) {
    return this.http.get(
      `${environment.endpoint}/backend/orders?company_id=1&status_id=${status}&is_changed=${changed}&accept_change=${accept}&canceled=${canceled}&page=${page}`
    );
  }

  getOrderspages(
    page = 1,
    company_id: any,
    status: any,
    changed = 0,
    accept = 0,
    canceled = 0,
    payed = 1
  ) {
    return this.http.get(
      `${environment.endpoint}/backend/orders?page=${page}&company_id=1&status_id=${status}&is_changed=${changed}&accept_change=${accept}&canceled=${canceled}&payed=${payed}`
    );
  }

  getOrdersPagination(object) {
    var url: any = new URL(`${environment.endpoint}/backend/orders`);
    for (const [key, value] of Object.entries(object)) {
      console.log(key, value);
      url.searchParams.append(key, value);
    }
    console.log(url, "url here");

    return this.http.get(url.href);
  }

  updatePersonalInfo(f) {
    let formData = new FormData();

    formData.append("name", f.name);
    formData.append("email", f.email);
    formData.append("password", f.password);
    // formData.append('admin_id',f.admin_id)
    return this.http.post(
      `${environment.endpoint}/backend/update-profile`,
      formData
    );
  }
  updateAdmin(f) {
    let formData = new FormData();

    formData.append("name", f.name);
    formData.append("email", f.email);
    formData.append("password", f.password);
    formData.append("admin_id", f.admin_id);
    return this.http.post(
      `${environment.endpoint}/backend/admins/edit`,
      formData
    );
  }
  getTransactions(page) {
    return this.http.get(
      `${environment.endpoint}/backend/transactions?page=${page}`
    );
  }

  addpromoCode(f) {
    let formData = new FormData();
    formData.append("code", f.code);
    formData.append("discount_precentage", f.discount_precentage);
    formData.append("expire_at", f.expire_at);

    return this.http.post(
      `${environment.endpoint}/backend/promo_codes/create`,
      formData
    );
  }

  //1
  ConfirmOrder(id, note = "") {
    let formData = new FormData();
    formData.append("order_id", id);
    return this.http.post(
      `${environment.endpoint}/backend/orders/confirm?note=${note}`,
      formData
    );
  }

  //2
  recieveOrder(id, note = "") {
    let formData = new FormData();
    formData.append("order_id", id);
    return this.http.post(
      `${environment.endpoint}/backend/orders/receive-china?note=${note}`,
      formData
    );
  }
  //3
  ChangeOrdersStatus(id, status, note = "") {
    let formData = new FormData();
    formData.append("order_id", id);
    formData.append("status_id", status);

    return this.http.post(
      `${environment.endpoint}/backend/orders/change-status?note=${note}`,
      formData
    );
  }
  finishOrder(id) {
    let formData = new FormData();
    formData.append("order_id", id);

    return this.http.post(
      `${environment.endpoint}/backend/orders/finish`,
      formData
    );
  }

  cancelOrder(id, note = "") {
    let formData = new FormData();
    formData.append("order_id", id);
    // if(note){
    //   return this.http.post(`${environment.endpoint}/backend/orders/cancel?note=${note}`, formData);
    // }
    return this.http.post(
      `${environment.endpoint}/backend/orders/cancel?note=${note}`,
      formData
    );
  }

  changePayment(id, changed: any = 1, price, note = "") {
    let formData = new FormData();
    formData.append("order_id", id);
    formData.append("is_changed", changed);
    formData.append("calculated_price", price);

    return this.http.post(
      `${environment.endpoint}/backend/orders/check-price?note=${note}`,
      formData
    );
  }

  personalData(id) {
    return this.http.get(
      `${environment.endpoint}/backend/admins/show?admin_id=${id}`
    );
  }
  allOrders(status_id) {
    return this.http.get(
      `${environment.endpoint}/backend/orders/all?status_id=${status_id}`
    );
  }

  getPromoCode() {
    return this.http.get(`${environment.endpoint}/backend/promo_codes`);
  }

  editPromo(f) {
    return this.http.post(
      `${environment.endpoint}/backend/promo_codes/edit`,
      f
    );
  }

  deletePromo(id) {
    return this.http.get(
      `${environment.endpoint}/backend/promo_codes/delete?promo_code_id=${id}`
    );
  }

  // Category

  allCategories() {
    return this.http.get(`${environment.endpoint}/main-specialists`);
  }
  addCategory(f) {
    const formData: FormData = new FormData();
    console.log(f);
    formData.append("name_en", f.name_en);
    formData.append("name_ar", f.name_ar);
    formData.append("image", f.image);
    console.log(formData);
    return this.http.post(
      `${environment.endpoint}/main-specialists/create`,
      formData
    );
  }
  editCategory(f) {
    console.log("ss", f);
    const formData: FormData = new FormData();
    formData.append("image", f.image);
    formData.append("title_ar", f.name);
    formData.append("main_specialist_id", f.main_specialist_id);
    formData.append("name_ar", f.name_ar);
    formData.append("name_en", f.name_en);
    console.log("hello form", formData);
    return this.http.post(
      `${environment.endpoint}/main-specialists/edit`,
      formData
    );
  }
  deleteCategory(category_id) {
    const forms: FormData = new FormData();
    forms.append("main_specialist_id", category_id);
    return this.http.post(
      `${environment.endpoint}/main-specialists/delete`,
      forms
    );
  }

  allSubCategories() {
    return this.http.get(`${environment.endpoint}/secondary-specialists`);
  }
  addSubCategory(f) {
    const formData: FormData = new FormData();
    formData.append("name_en", f.name_en);
    formData.append("name_ar", f.name_ar);
    formData.append("main_specialist_id", f.category_id);
    formData.append("image", f.image);
    return this.http.post(
      `${environment.endpoint}/secondary-specialists/create`,
      formData
    );
  }
  editSubCategory(f) {
    console.log(f);
    const formData: FormData = new FormData();
    formData.append("name_en", f.name_en);
    formData.append("name_ar", f.name_ar);
    formData.append("main_specialist_id", f.main_specialist_id);
    formData.append("image", f.image);
    formData.append("title_ar", f.title_ar);
    formData.append("secondary_specialist_id", f.secondary_specialist_id);
    console.log(formData);
    return this.http.post(
      `${environment.endpoint}/secondary-specialists/edit`,
      formData
    );
  }
  deleteSubCategory(category_id) {
    const deletedsubCat: FormData = new FormData();
    deletedsubCat.append("secondary_specialist_id", category_id);
    return this.http.post(
      `${environment.endpoint}/secondary-specialists/delete`,
      deletedsubCat
    );
  }
  allCities() {
    return this.http.get(`${environment.endpoint}/cities`);
  }
  addCity(f) {
    console.log(f);
    const addedCity: FormData = new FormData();
    addedCity.append("name_en", f.name_en);
    addedCity.append("name_ar", f.name_ar);
    // addedCity.append('image',f.image)
    return this.http.post(`${environment.endpoint}/cities/create`, addedCity);
  }
  editCity(f) {
    // const formData:FormData = new FormData()
    console.log(f);
    // formData.append('name_en',f.name_en)
    // formData.append('title_ar',f.name_ar)
    // formData.append('name_ar',f.name_ar)
    // formData.append('city_id',f.id)
    // formData.append('image',f.image)
    return this.http.post(`${environment.endpoint}/cities/edit`, f);
  }
  deleteCity(city_id) {
    const deletedCity: FormData = new FormData();
    deletedCity.append("city_id", city_id);
    return this.http.post(`${environment.endpoint}/cities/delete`, deletedCity);
  }

  //banners

  allBanners() {
    return this.http.get(`${environment.endpoint}/banners`);
  }
  addBanner(f) {
    const formData: FormData = new FormData();
    formData.append("title_en", f.title_en);
    formData.append("title_ar", f.title_ar);
    formData.append("description_ar", f.description_ar);
    formData.append("description_en", f.description_en);

    formData.append("image", f.image);
    return this.http.post(`${environment.endpoint}/banners/create`, formData);
  }
  editBanner(f) {
    console.log(f);
    const formData: FormData = new FormData();
    formData.append("title_en", f.title_en);
    formData.append("title_ar", f.title_ar);
    formData.append("description_ar", f.description_ar);
    formData.append("description_en", f.description_en);
    formData.append("banner_id", f.banner_id);

    formData.append("image", f.image);
    return this.http.post(`${environment.endpoint}/banners/edit`, formData);
  }
  deleteBanner(banner_id) {
    console.log(banner_id);
    return this.http.get(
      `${environment.endpoint}/banners/delete?banner_id=${banner_id}`
    );
  }

  // Products

  allProducts() {
    return this.http.get(`${environment.endpoint}/products`);
  }
  // addProduct(f){
  //   const formData:FormData = new FormData()
  //   formData.append('name_en',f.name_en)
  //   formData.append('name_ar',f.name_ar)
  //   formData.append('image',f.image)
  //   return this.http.post(`${environment.endpoint}/backend/categories/create`,formData)
  // }
  // deleteProduct(category_id){
  //   return this.http.delete(`${environment.endpoint}/backend/categories/delete?category_id=${category_id}`)
  // }

  //All Users
  allUsers(active) {
    console.log(active);

    return this.http.get(
      `${environment.endpoint}/users?type=1&active=${active}`
    );
  }

  allProviders(active) {
    console.log(active);
    return this.http.get(
      `${environment.endpoint}/users?type=2&active=${active}`
    );
  }
  // deleteUser(user_id){
  //   return this.http.delete(`${environment.endpoint}/admin/users/delete?user_id=${user_id}`)
  // }
  // blockUser(user_id){
  //   const formData:FormData = new FormData()
  //   formData.append('user_id',user_id)
  //   return this.http.post(`${environment.endpoint}/admin/block-user`,formData)
  // }
  // unblockUser(user_id){
  //   const formData:FormData = new FormData()
  //   formData.append('user_id',user_id)
  //   return this.http.post(`${environment.endpoint}/admin/unblock-user`,formData)
  // }

  //All Users
  allStores(active) {
    return this.http.get(
      `${environment.endpoint}/backend/users/all?type_id=2&active=${active}`
    );
  }

  changeUserStatus(user_id, active_id) {
    // const formData:FormData = new FormData()
    // formData.append('user_id',user_id)
    // formData.append('active_id',active_id)
    console.log("hello fro change", user_id, active_id);
    // ${environment.endpoint}/users?type=2&active=${active}
    return this.http.get(
      `${environment.endpoint}/users/active?user_id=${user_id}&active=${active_id}`
    );
  }

  // Colors

  allColors() {
    return this.http.get(`${environment.endpoint}/colors`);
  }
  addColor(form) {
    const formData: FormData = new FormData();
    formData.append("name_en", form.name_en);
    formData.append("name_ar", form.name_ar);
    formData.append("code", form.code);
    return this.http.post(
      `${environment.endpoint}/backend/colors/create`,
      formData
    );
  }
  deleteColor(category_id) {
    return this.http.delete(
      `${environment.endpoint}/backend/colors/delete?color_id=${category_id}`
    );
  }

  // Sizes

  allSizes() {
    return this.http.get(`${environment.endpoint}/sizes`);
  }
  addSize(f) {
    const formData: FormData = new FormData();
    formData.append("name_en", f.name_en);
    formData.append("name_ar", f.name_ar);
    return this.http.post(
      `${environment.endpoint}/backend/sizes/create`,
      formData
    );
  }
  deleteSize(category_id) {
    return this.http.delete(
      `${environment.endpoint}/backend/sizes/delete?size_id=${category_id}`
    );
  }

  // Occasions

  allOccasions() {
    return this.http.get(`${environment.endpoint}/occasions`);
  }
  addOccasions(f) {
    const formData: FormData = new FormData();
    formData.append("name_en", f.name_en);
    formData.append("name_ar", f.name_ar);
    return this.http.post(
      `${environment.endpoint}/backend/occasion/create`,
      formData
    );
  }
  deleteOccasions(category_id) {
    return this.http.delete(
      `${environment.endpoint}/backend/occasion/delete?occasion_id=${category_id}`
    );
  }

  // Occasions

  homeStatistics() {
    return this.http.get(`${environment.endpoint}/backend/reports/show`);
  }

  // Filter By User ID

  filterOrdersByuserId(user_id) {
    return this.http.get(
      `${environment.endpoint}/backend/orders/show?user_id=${user_id}`
    );
  }
  getAllShipmentsType() {
    return this.http.get(`${environment.endpoint}/shipment_types`);
  }
}
