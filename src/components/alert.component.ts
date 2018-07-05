import {
    Component, OnInit } from '@angular/core';
 import {   trigger, state, style, transition, animate } from '@angular/animations';
import { AlertService } from '../services/alert.service';
import { Subscription } from 'rxjs';

//import { AlertItem } from 'app-models';

@Component({
    selector: 'app-alert',
    templateUrl: './alert.component.html',
    animations: [
        // Animation example
        // Triggered in this viw [@flyInOut]
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
    public alerts: any[];

    constructor(private alertService: AlertService) {
        console.log("entro")
        alertService.addAlert$.subscribe( 
            msg => {
                console.log("me llega el msg", msg)
                this.alerts.push(msg);
            });
    }
}

