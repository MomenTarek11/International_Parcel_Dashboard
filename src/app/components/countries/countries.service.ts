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
}
