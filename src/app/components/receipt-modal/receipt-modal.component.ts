import { Component, Input } from '@angular/core';
import { ReimbursementDto } from 'src/app/models/reimbursement-dto';
import { ModalService } from 'src/app/services/modal.service';

@Component({
  selector: 'app-receipt-modal',
  templateUrl: './receipt-modal.component.html',
  styleUrls: ['./receipt-modal.component.css']
})
export class ReceiptModalComponent {

  @Input() modalReimbDto!: ReimbursementDto;

  constructor(
    public modalService: ModalService
  ) { }
}
