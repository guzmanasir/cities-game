import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

/**
 * Api is a generic REST Api handler. Set your API url first.
 */
@Injectable()
export class CitiesService {

  constructor(public http: HttpClient) {
  }

  getCities() {
    return this.http.get('http://localhost:4200/assets/capitalCities.json')
  }

}
