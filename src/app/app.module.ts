import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import {FlexLayoutModule} from '@angular/flex-layout';
import { AlertModule } from 'ngx-bootstrap/alert';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { AgmCoreModule, AgmMarker } from '@agm/core';
import { coordenates } from '../providers/getCoordenates';
import { CitiesService } from '../providers/citiesJSON';
import { RoundPipe } from '../pipes/round.pipe';
import { AlertService } from '../services/alert.service';
import { AlertComponent } from '../components/alert.component';



@NgModule({
  declarations: [
    AppComponent,
    RoundPipe,
    AlertComponent
    
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    HttpClientModule,
    AlertModule.forRoot(),
    ButtonsModule.forRoot(),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBVMiWGFeeehden5YX6fpBeXOCcsD-rAzY'
    })
  ],
  providers: [AgmMarker, coordenates, CitiesService, AlertService],
  bootstrap: [AppComponent]
})
export class AppModule { }
