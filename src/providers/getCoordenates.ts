import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

/**
 * Api is a generic REST Api handler. Set your API url first.
 */
@Injectable()
export class coordenates {

  constructor(public http: HttpClient) {
  }

  getCoordenates(citie: string) {
    return this.http.get('https://maps.googleapis.com/maps/api/geocode/json?address=' + encodeURIComponent(citie) + '&key=AIzaSyBVMiWGFeeehden5YX6fpBeXOCcsD-rAzY', { headers: { 'Content-Type': 'application/json', 'dataTpye':'jsonp' } });
  }


}
