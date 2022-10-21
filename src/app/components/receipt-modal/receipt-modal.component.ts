import { Component, OnInit } from '@angular/core';
import { ReimbursementDto } from 'src/app/models/reimbursement-dto';

@Component({
  selector: 'app-receipt-modal',
  templateUrl: './receipt-modal.component.html',
  styleUrls: ['./receipt-modal.component.css']
})
export class ReceiptModalComponent implements OnInit {

  reimbursementDtos: ReimbursementDto[] = [];

  constructor() { }

  ngOnInit(): void {
  }

}
