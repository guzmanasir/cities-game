import {
    Component, OnInit } from '@angular/core';
 import {   trigger, state, style, transition, animate } from '@angular/animations';
import { AlertService } from '../services/alert.service';
import { Subscription } from 'rxjs';


@Component({
    selector: 'app-alert',
    templateUrl: './alert.component.html',
    animations: [
        trigger('flyInOut', [
            state('in', style({ transform: 'translateY(0)' })),
            transition('void => *', [
                style({ transform: 'translateY(100%)' }),
                animate(100)
            ]),
            transition('* => void', [
                animate(100, style({ transform: 'translateY(-100%)' }))
            ])
        ])
    ]
})
export class AlertComponent{
    public alerts: any[] = [];

    constructor(private alertService: AlertService) {
        alertService.addAlert$.subscribe( 
            msg => {
                this.alerts.push(msg);
            });
    }
}

