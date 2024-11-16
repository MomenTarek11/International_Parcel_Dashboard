import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class CitiesService {
  constructor(private http: HttpClient) {}
  getAllcities(id: any) {
    return this.http.get(`${environment.endpoint}/cities?country_id=${id}`);
  }
  createCity(form: any) {
    const Form = new FormData();
    Form.append("name_ar", form.name_ar);
    Form.append("name_en", form.name_en);
    Form.append("name_cn", form.name_cn);
    Form.append("country_id", form.country_id);
    return this.http.post(`${environment.endpoint}/backend/cities/add`, Form);
  }
  updateCity(form: any) {
    const Form = new FormData();
    Form.append("name_ar", form.name_ar);
    Form.append("name_en", form.name_en);
    Form.append("name_cn", form.name_cn);
    Form.append("country_id", form.country_id);
    Form.append("city_id", form.city_id);
    return this.http.post(`${environment.endpoint}/backend/cities/edit`, Form);
  }
  deleteCity(id: number) {
    return this.http.delete(
      `${environment.endpoint}/backend/cities?city_id=${id}`
    );
  }
}
