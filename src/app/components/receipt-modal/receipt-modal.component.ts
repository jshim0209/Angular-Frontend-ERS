import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { ReimbursementDto } from 'src/app/models/reimbursement-dto';
import { ModalService } from 'src/app/services/modal.service';
import { EmployeeHomeComponent } from '../employee-home/employee-home.component';
import { ManagerHomeComponent } from '../manager-home/manager-home.component';

@Component({
  selector: 'app-receipt-modal',
  templateUrl: './receipt-modal.component.html',
  styleUrls: ['./receipt-modal.component.css']
})
export class ReceiptModalComponent {

  // @ViewChild(ManagerHomeComponent) managerHome: any;
  // @ViewChild(EmployeeHomeComponent) employeeHome: any;

  @Input() modalReimbDto!: ReimbursementDto;

  reimbursementDto!: ReimbursementDto;
  reimbursementDtos: ReimbursementDto[] = [];

  constructor(
    public modalService: ModalService
  ) { }


  // ngAfterViewInit() {
  //   this.reimbursementDto = this.managerHome.reimbursementDto;
  // }
}
