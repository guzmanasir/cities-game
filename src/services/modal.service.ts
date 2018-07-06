import { Injectable } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { ModalContentComponent } from '../components/modal.component';
 
@Injectable()
export class ModalComponentService {
  bsModalRef: BsModalRef;
  constructor(private modalService: BsModalService) {}
 
  openModalWithComponent(title: string, msg: string) {
    const initialState = {
      msg: msg,
      title: title
    };
    this.bsModalRef = this.modalService.show(ModalContentComponent, {initialState});
    this.bsModalRef.content.closeBtnName = 'Close';
  }
}