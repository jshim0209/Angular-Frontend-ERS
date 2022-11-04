import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ReimbursementDto } from 'src/app/models/reimbursement-dto';
import { Status } from 'src/app/models/status';
import { UpdateStatusDto } from 'src/app/models/update-status-dto';
import { ModalService } from 'src/app/services/modal.service';
import { ReimbursementService } from 'src/app/services/reimbursement.service';
import { UserService } from 'src/app/services/user.service';
import { ResolveReimbursementComponent } from '../resolve-reimbursement/resolve-reimbursement.component';

@Component({
  selector: 'app-manager-home',
  templateUrl: './manager-home.component.html',
  styleUrls: ['./manager-home.component.css']
})
export class ManagerHomeComponent implements OnInit {

  @ViewChild(ResolveReimbursementComponent)
  resolveComponent!: ResolveReimbursementComponent;

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

  modalOpen = this.modalService.openResolveModal;

  constructor(
    private reimbService: ReimbursementService,
    private userService: UserService,
    public modalService: ModalService,
    private router: Router,
  ) { }

  ngOnInit() {
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
      this.getAllReimbursements();
    }
  }

  openResolveModal = (data: any) => {
    if (this.modalService.openResolveModal == false) {
      this.modalService.openResolveModal = true;
      this.editData = Object.assign(data);
      console.log(this.editData);
    } else {
      this.modalService.openResolveModal = false;
      this.getAllReimbursements();
    }

  }

  closeResolveModal () {
    this.modalService.openResolveModal = false;
    this.getAllReimbursements();
  }

  listStatuses() {
    this.reimbService.getStatuses().subscribe({
      next:  (data: any) => {
        this.statuses = data;
      }
    });
  }

  refreshTable(event: Event) {
    if (event != null) {
      this.getAllReimbursements();
    }
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

  // approveReimbursement(reimbId: number) {
  //   const updateStatusDto = {
  //     resolverId: this.modalUserData.userId,
  //     statusId: 2
  //   };


  //   this.resolveReimbursement(reimbId, updateStatusDto);
  //   this.modalOpen = false;
  //   this.router.navigate(['manager-home']);
  // }

  // rejectReimbursement(reimbId: number) {
  //   const updateStatusDto = {
  //     resolverId: this.modalUserData.userId,
  //     statusId: 3
  //   };


  //   this.resolveReimbursement(reimbId, updateStatusDto);
  //   this.modalOpen = false;
  //   this.router.navigate(['manager-home']);
  // }

  // resolveReimbursement(reimbId: number, updateStatusDto: UpdateStatusDto) {
  //   this.reimbService.updateReimbursementStatus(reimbId, updateStatusDto).subscribe((data) => {
  //     if (data != null) {
  //       console.log(data);
  //       return this.getAllReimbursements();

  //     }
  //   });
  // }
}
