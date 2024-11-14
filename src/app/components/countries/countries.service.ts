import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class CountriesService {
  countries: any;
  constructor(private http: HttpClient) {}
  getAllCountries() {
    return this.http.get(`${environment.endpoint}/countries`);
  }
  addCountry(form: any) {
    const Form = new FormData();
    Form.append("name_ar", form.name_ar);
    Form.append("name_en", form.name_en);
    Form.append("name_cn", form.name_cn);
    return this.http.post(
      `${environment.endpoint}/backend/countries/add`,
      Form
    );
  }
}
