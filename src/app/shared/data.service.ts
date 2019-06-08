import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable()
export class DataService {
  configUrl = "https://raw.githubusercontent.com/iamramkey/altimetric/master/src/assets/employees.json";
  constructor(private http: HttpClient) {}

  getConfig() {
    return this.http.get(this.configUrl);
  }
}
