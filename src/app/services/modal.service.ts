import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  openDialog: boolean = false;

  constructor() { }
}
