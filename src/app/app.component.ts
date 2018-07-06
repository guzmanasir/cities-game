import { Component, NgZone, ViewChild, AfterViewInit } from "@angular/core";
import { MapStyleService } from "../providers/map-style.provider";
import { GoogleMapsAPIWrapper } from "@agm/core";
import { MapsAPILoader } from "@agm/core";
import { AgmMap } from "@agm/core";
import * as async from "async";
import { CitiesService } from "../providers/cities-json.provider";
import { AlertComponent } from "ngx-bootstrap/alert";
import { AlertService } from "../services/alert.service";
import { ModalComponentService } from "../services/modal.service";
declare var google: any;
@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent extends GoogleMapsAPIWrapper {
  @ViewChild(AgmMap) public agmMap: AgmMap;
  @ViewChild(AlertComponent) public alert: AlertComponent;

  title = "My first AGM project";
  lat = 51.678418;
  lng = 7.809007;
  private endGame: boolean = false;
  private bounds: any;
  private styleMap: any;
  private latMarker: number;
  private lngMarker: number;
  private geocoder: any;
  private loading: boolean;
  private cities: any;
  private indexCity: number = 0;
  private score: number = 1500;
  private points: number = 0;
  constructor(
    private modalService: ModalComponentService,
    private alertService: AlertService,
    private citiesService: CitiesService,
    private __loader: MapsAPILoader,
    private __zone: NgZone,
    private mapStyle: MapStyleService
  ) {
    super(__loader, __zone);

  }
  setMarker(ev) {
    this.latMarker = ev.coords.lat;
    this.lngMarker = ev.coords.lng;
  }

  ngOnInit() {
    this.styleMap = this.mapStyle.getMapStyle();
    this.__loader.load().then(() => {
      this.geocoder = new google.maps.Geocoder();
      this.bounds = new google.maps.LatLngBounds();


      this.citiesService.getCities().subscribe((cities: any) => {
        this.cities = cities.capitalCities;
        if (this.cities) {
          this.getCoordenates();
        }

      });
    });
  }

  getCoordenates() {
    this.loading = true;
    async.eachSeries(
      this.cities,
      (item: any, cb) => {
        this.geocoder.geocode(
          { address: encodeURIComponent(item.capitalCity) },
          response => {
            item.lat = response[0].geometry.location.lat();
            item.long = response[0].geometry.location.lng();
            cb();
          }
        );
      },
      () => {
        this.loading = false;
        this.bounds.extend(new google.maps.LatLng('66.057878', '-22.579047'));
        this.bounds.extend(new google.maps.LatLng('37.961952', '43.878878'));
        this.agmMap.triggerResize();
      }
    );
  }

  placeMarker() {
    const distance = this.getDistanceFromLatLonInKm(
      this.cities[this.indexCity].lat,
      this.cities[this.indexCity].long,
      this.latMarker,
      this.lngMarker
    );
    if (this.indexCity + 1 < this.cities.length) {
      

      if (distance <= 50) {
        this.alertService.addAlert("success", "You placed " + this.cities[this.indexCity].capitalCity + " correctly", 3000);
        this.points += 1;
      } else {
        this.alertService.addAlert("danger", "You placed " + this.cities[this.indexCity].capitalCity + " wrong", 3000);
      }
      if (this.score - distance > 0) {
        this.score -= distance;
      } else {
        this.modalService.openModalWithComponent("Game over", "You dont have more kilometers left, do you want to retry?");
        this.score = 0;
        this.endGame = true;
      }
      this.indexCity += 1;
    } else if (this.score > 0) {
      this.endGame = true;
      this.modalService.openModalWithComponent("You Won!", "You placed " + this.points + " cities out of " + this.cities.length + ". Do you want to try again?");
    }
  }

  getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
    const R = 6371;
    const dLat = this.deg2rad(lat2 - lat1);
    const dLon = this.deg2rad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.deg2rad(lat1)) *
      Math.cos(this.deg2rad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = R * c;
    return d;
  }

  deg2rad(deg) {
    return deg * (Math.PI / 180);
  }
}
