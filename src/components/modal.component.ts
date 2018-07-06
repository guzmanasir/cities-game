import {
    Component, OnInit } from '@angular/core';
    import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { AppComponent } from '../app/app.component';
@Component({
    selector: 'modal-content',
    templateUrl: './modal.component.html'
  })
   
  export class ModalContentComponent implements OnInit {
    title: string;
    closeBtnName: string;
    msg: string;
   
    constructor(public bsModalRef: BsModalRef) {}
   
    ngOnInit() {
    }

    confirm() {
        window.location.reload()
    }
  }