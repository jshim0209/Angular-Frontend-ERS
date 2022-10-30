import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  openReceiptModal: boolean = false;
  openResolveModal: boolean = false;

  constructor() { }
}
