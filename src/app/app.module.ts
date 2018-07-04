import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';

import { AgmCoreModule, AgmMarker } from '@agm/core';
import { coordenates } from '../providers/getCoordenates';



@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AgmCoreModule.forRoot({
      apiKey: ''
    })
  ],
  providers: [AgmMarker, coordenates],
  bootstrap: [AppComponent]
})
export class AppModule { }
