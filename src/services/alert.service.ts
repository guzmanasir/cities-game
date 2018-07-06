import { Injectable } from '@angular/core'; 
import { Subject } from 'rxjs';
import { Observable } from 'rxjs'

@Injectable()
export class AlertService {
    private addAlertSource = new Subject<any>();

    addAlert$ = this.addAlertSource.asObservable();

    addAlert(_type: string, _msg: string, _timeout: number) {
        this.addAlertSource.next({ type: _type, msg: _msg, timeout: _timeout });
    }  
}
