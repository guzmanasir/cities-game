import { Component, NgZone, ViewChild, AfterViewInit } from '@angular/core';
import { coordenates } from '../providers/getCoordenates';
import { GoogleMapsAPIWrapper } from '@agm/core';
import { MapsAPILoader } from '@agm/core';
import { AgmMap } from '@agm/core';
import * as async from "async";
import { CitiesService } from '../providers/citiesJSON';
import { AlertComponent } from 'ngx-bootstrap/alert';
import { AlertService } from '../services/alert.service';
declare var google: any;
@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})

export class AppComponent extends GoogleMapsAPIWrapper {
    @ViewChild(AgmMap) public agmMap: AgmMap
    @ViewChild(AlertComponent) public alert: AlertComponent;
    
    title: string = 'My first AGM project';
    lat: number = 51.678418;
    lng: number = 7.809007;
    private bounds;
    private styleMap;
    private latMarker;
    private lngMarker;
    private geocoder;
    private loading;
    private cities: any;
    private indexCity = 0;
    private score = 1500;
    private points = 0;
    constructor( private alertService: AlertService, private citiesService: CitiesService ,private __loader: MapsAPILoader, private __zone: NgZone, private coordenates: coordenates) {
        super(__loader, __zone);
        
        this.bounds = { se: [35.626316, -11.859641], nw: [72.747395, 40.808528] }
   

    }
    setMarker(ev) {

        this.latMarker = ev.coords.lat;
        this.lngMarker = ev.coords.lng;
        console.log("los marker", this.latMarker, this.lngMarker, ev)
    }
   

    ngOnInit() {
        console.log("cities", this.cities, this.agmMap)
        this.styleMap = this.coordenates.getMapStyle();
        this.__loader.load().then(() => {
            this.geocoder = new google.maps.Geocoder();
            this.citiesService.getCities().subscribe((cities: any)=> {
                console.log("en el service", cities)
                this.cities = cities.capitalCities;

                this.getCoordenates()
            })
            
        })

    }


    getCoordenates() {
        this.loading = true;
        console.log("entro aqui", )
        async.eachSeries(this.cities, (item, cb) => {
            console.log(item.capitalCity)
            this.geocoder.geocode({ address: encodeURIComponent(item.capitalCity) }, (response) => {
                console.log("la respuesta", response[0])
                console.log(item)
                item.lat = response[0].geometry.location.lat()
                item.long = response[0].geometry.location.lng()
                cb()
                console.log("loading", item)


            })
        }, () => {
            this.loading = false;
            this.agmMap.triggerResize();
            
        })
    }

    placeMarker() {
        let distance = this.getDistanceFromLatLonInKm(this.cities[this.indexCity].lat, this.cities[this.indexCity].long, this.latMarker, this.lngMarker);
        if(this.indexCity + 1 < this.cities.length) {
            this.indexCity += 1;
        }
        if(distance <= 50) {
            this.alertService.addAlert(
                'Success',
                'Great',
                3000
              );
            this.points += 1; 
        }
        if (this.score - distance > 0) {
            this.score -= distance;
        } else {
            this.score = 0;
        }
        
        console.log("la distnacia", distance)
    }

    getDistanceFromLatLonInKm(lat1,lon1,lat2,lon2) {
        var R = 6371; 
        var dLat = this.deg2rad(lat2-lat1);  
        var dLon = this.deg2rad(lon2-lon1); 
        var a = 
          Math.sin(dLat/2) * Math.sin(dLat/2) +
          Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) * 
          Math.sin(dLon/2) * Math.sin(dLon/2)
          ; 
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
        var d = R * c; 
        return d;
      }
      
      deg2rad(deg) {
        return deg * (Math.PI/180)
      }
}