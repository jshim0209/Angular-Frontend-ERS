import { Component, Input, OnInit } from '@angular/core';
import { ReimbursementDto } from 'src/app/models/reimbursement-dto';
import { Status } from 'src/app/models/status';
import { UpdateStatusDto } from 'src/app/models/update-status-dto';
import { ModalService } from 'src/app/services/modal.service';
import { ReimbursementService } from 'src/app/services/reimbursement.service';

@Component({
  selector: 'app-manager-home',
  templateUrl: './manager-home.component.html',
  styleUrls: ['./manager-home.component.css']
})
export class ManagerHomeComponent implements OnInit {

  @Input() status!: Status;
  firstName = localStorage.getItem('firstName');
  userId = localStorage.getItem('userId');
  userRole = localStorage.getItem('userRole');
  statuses: Status[] = [];
  reimbursementDtos: ReimbursementDto[] = [];
  filteredData: ReimbursementDto[] = [];
  reimbursementDto!: ReimbursementDto;
  currentStatusId: number = 0;
  isActive: boolean = false;
  updateStatusDto!: UpdateStatusDto;
  isFiltered: boolean = false;

  constructor(
    private reimbService: ReimbursementService,
    public modalService: ModalService,
  ) { }

  ngOnInit() {
    this.listStatuses();
    this.getAllReimbursements();
  }

  openModal() {
    if (this.isActive == false) {
      this.isActive = true;
    } else {
      this.isActive = false;
    }
  }

  openResolveModal(reimbId: number) {
    this.modalService.openDialog = true
    console.log(reimbId);
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

    console.log(this.filteredData);

  }

  resolveReimbursement(reimbId: number, updateStatusDto: UpdateStatusDto) {
    this.reimbService.updateReimbursementStatus(reimbId, updateStatusDto).subscribe({
      next: (data: any) => {
        this.reimbursementDto = data;

      }
    })
  }
}
