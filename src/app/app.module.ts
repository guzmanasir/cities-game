import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AlertModule } from 'ngx-bootstrap/alert';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { ModalModule } from 'ngx-bootstrap/modal';
import { AgmCoreModule, AgmMarker } from '@agm/core';
import { MapStyleService } from '../providers/map-style.provider';
import { CitiesService } from '../providers/cities-json.provider';
import { RoundPipe } from '../pipes/round.pipe';
import { AlertService } from '../services/alert.service';
import { AlertComponent } from '../components/alert.component';
import { ModalComponentService } from '../services/modal.service';
import { ModalContentComponent } from '../components/modal.component';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    AppComponent,
    RoundPipe,
    AlertComponent,
    ModalContentComponent

  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    HttpClientModule,
    RouterModule,
    AlertModule.forRoot(),
    ButtonsModule.forRoot(),
    ModalModule.forRoot(),
    AgmCoreModule.forRoot({
      apiKey: ''
    })
  ],
  providers: [AgmMarker, MapStyleService, CitiesService, AlertService, ModalComponentService],
  entryComponents: [ModalContentComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
