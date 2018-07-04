import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import {FlexLayoutModule} from '@angular/flex-layout';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule} from '@angular/material/button';

import { AppComponent } from './app.component';

import { AgmCoreModule, AgmMarker } from '@agm/core';
import { coordenates } from '../providers/getCoordenates';
import { CitiesService } from '../providers/citiesJSON';



@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    MatButtonModule,
    BrowserModule,
    FlexLayoutModule,
    HttpClientModule,
    BrowserAnimationsModule,
    
    AgmCoreModule.forRoot({
      apiKey: ''
    })
  ],
  exports: [MatButtonModule],
  providers: [AgmMarker, coordenates, CitiesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
