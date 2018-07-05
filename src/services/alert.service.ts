import { Injectable } from '@angular/core'; 
import { Subject } from 'rxjs';
import { Observable } from 'rxjs'

@Injectable()
export class AlertService {
    private addAlertSource = new Subject<any>();

    addAlert$ = this.addAlertSource.asObservable();

    addAlert(_type: string, _msg: string, _timeout: number) {
        console.log("me llega", _type, _msg, _timeout)
        this.addAlertSource.next({ type: _type, msg: _msg, timeout: _timeout });
    }  
}
