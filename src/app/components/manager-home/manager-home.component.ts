import { Component, OnInit } from '@angular/core';
import { ReimbursementDto } from 'src/app/models/reimbursement-dto';
import { Status } from 'src/app/models/status';
import { UpdateStatusDto } from 'src/app/models/update-status-dto';
import { ModalService } from 'src/app/services/modal.service';
import { ReimbursementService } from 'src/app/services/reimbursement.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-manager-home',
  templateUrl: './manager-home.component.html',
  styleUrls: ['./manager-home.component.css']
})
export class ManagerHomeComponent implements OnInit {

  firstName = this.userService.getUser().firstName;
  userId = this.userService.getUser().userId;
  userRole = this.userService.getUser().userRole;
  statuses: Status[] = [];
  reimbursementDtos: ReimbursementDto[] = [];
  filteredData: ReimbursementDto[] = [];
  reimbursementDto!: ReimbursementDto;
  currentStatusId: number = 0;
  isReceiptModalActive: boolean = false;
  isResolveModalActive: boolean = false;
  updateStatusDto!: UpdateStatusDto;
  isFiltered: boolean = false;
  editData: any = {};
  modalUserData = Object.assign(this.userService.getUser());

  constructor(
    private reimbService: ReimbursementService,
    private userService: UserService,
    public modalService: ModalService,
  ) { }

  ngOnInit() {
    console.log(this.userId);
    console.log(this.userRole);
    this.listStatuses();
    this.getAllReimbursements();
  }

  onSelect(selectedItem: any) {
    console.log("Selected item Id: ", selectedItem.Id); // You get the Id of the selected item here
}

  openReceiptModal = (data: any) => {
    if (this.modalService.openReceiptModal == false) {
      this.modalService.openReceiptModal = true;
      this.editData = Object.assign(data);
      console.log(this.editData);
    } else {
      this.modalService.openReceiptModal = false;
    }
  }

  openResolveModal = (data: any) => {
    if (this.modalService.openResolveModal == false) {
      this.modalService.openResolveModal = true;
      this.editData = Object.assign(data);
      console.log(this.editData);
    } else {
      this.modalService.openResolveModal = false;
    }
  }

  listStatuses() {
    this.reimbService.getStatuses().subscribe({
      next:  (data: any) => {
        this.statuses = data;
      }
    });
  }

  getAllReimbursements() {
    this.isFiltered = false;
    this.reimbService.getAllReimbursements().subscribe({
      next: (data: any) => {
        this.reimbursementDtos = data;
      }
    });
  }

  getReimbursementsByStatus(statusId: number) {
    this.isFiltered = true;
    this.filteredData = this.reimbursementDtos.filter((reimbursement) => {
      return reimbursement.status.id === statusId;

    });
  }

  approveReimbursement(reimbId: number) {
    const updateStatusDto = {
      resolverId: Number(this.userId),
      statusId: 2
    };

    console.log(reimbId);
    console.log(updateStatusDto);

    this.resolveReimbursement(reimbId, updateStatusDto);
  }

  rejectReimbursement(reimbId: number) {
    const updateStatusDto = {
      resolverId: Number(this.userId),
      statusId: 3
    };

    console.log(reimbId);
    console.log(updateStatusDto);

    this.resolveReimbursement(reimbId, updateStatusDto);
  }

  resolveReimbursement(reimbId: number, updateStatusDto: UpdateStatusDto) {

    this.isFiltered = false;
    this.isResolveModalActive = false;

    this.reimbService.updateReimbursementStatus(reimbId, updateStatusDto).subscribe({
      next: (data: any) => {
        this.reimbursementDto = data;

      }
    });
    this.getAllReimbursements();
  }
}
