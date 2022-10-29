import { Component, Input, OnInit } from '@angular/core';
import { ReimbursementDto } from 'src/app/models/reimbursement-dto';
import { Status } from 'src/app/models/status';
import { UpdateStatusDto } from 'src/app/models/update-status-dto';
import { ModalService } from 'src/app/services/modal.service';
import { ReimbursementService } from 'src/app/services/reimbursement.service';

@Component({
  selector: 'app-employee-home',
  templateUrl: './employee-home.component.html',
  styleUrls: ['./employee-home.component.css']
})
export class EmployeeHomeComponent implements OnInit {

  @Input() status!: Status;
  firstName = localStorage.getItem('firstName');
  userId = localStorage.getItem('userId');
  userRole = localStorage.getItem('userRole');
  statuses: Status[] = [];
  reimbursementDtos: ReimbursementDto[] = [];
  filteredData: ReimbursementDto[] = [];
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
    this.getReimbursementByUser(this.userId);
  }

  openModal() {
    if (this.isActive == false) {
      this.isActive = true;
    } else {
      this.isActive = false;
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
