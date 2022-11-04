import { Component, Input, OnInit } from '@angular/core';
import { ReimbursementDto } from 'src/app/models/reimbursement-dto';
import { Status } from 'src/app/models/status';
import { UpdateStatusDto } from 'src/app/models/update-status-dto';
import { ModalService } from 'src/app/services/modal.service';
import { ReimbursementService } from 'src/app/services/reimbursement.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-employee-home',
  templateUrl: './employee-home.component.html',
  styleUrls: ['./employee-home.component.css']
})
export class EmployeeHomeComponent implements OnInit {

  firstName = this.userService.getUser().firstName;
  userId = this.userService.getUser().userId;
  userRole = this.userService.getUser().userRole;
  statuses: Status[] = [];
  reimbursementDtos: ReimbursementDto[] = [];
  filteredData: ReimbursementDto[] = [];
  currentStatusId: number = 0;
  isReceiptModalActive: boolean = false;
  updateStatusDto!: UpdateStatusDto;
  isFiltered: boolean = false;
  editData: any = {};
  modalUserData = Object.assign(this.userService.getUser());

  modalOpen = this.modalService.openResolveModal;

  constructor(
    private reimbService: ReimbursementService,
    private userService: UserService,
    public modalService: ModalService,
  ) { }

  ngOnInit() {

    this.listStatuses();
    this.getReimbursementByUser(this.userId);
  }

  openReceiptModal = (data: any) => {
    if (this.modalService.openReceiptModal == false) {
      this.modalService.openReceiptModal = true;
      this.editData = Object.assign(data);
      console.log(this.editData);
    } else {
      this.modalService.openReceiptModal = false;
      this.getReimbursementByUser(this.userId);
    }
  }

  listStatuses() {
    this.reimbService.getStatuses().subscribe({
      next:  (data: any) => {
        this.statuses = data;
        console.log(data);
      }
    });
  }

  getReimbursementByUser(userId: string | null) {
    this.isFiltered = false;
    this.reimbService.getReimbursementByUser(userId).subscribe({
      next: (data: any) => {
        this.reimbursementDtos = data;
      }
    })
  }

  getReimbursementByUserAndStatus(statusId: number ) {

    this.isFiltered = true
    this.filteredData = this.reimbursementDtos.filter((reimbursement) => {
      return reimbursement.status.id === statusId;

    });

    console.log(this.filteredData);
  }
}
