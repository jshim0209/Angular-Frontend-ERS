import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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

  status!: Status;
  firstName = localStorage.getItem('firstName');
  userId = localStorage.getItem('userId');
  userRole = localStorage.getItem('userRole');
  reimbursementDtos: ReimbursementDto[] = [];
  reimbursementDto!: ReimbursementDto;
  currentStatusId: number = 0;
  statuses: Status[] = [];
  isActive: boolean = false;
  updateStatusDto!: UpdateStatusDto;

  constructor(
    private reimbService: ReimbursementService,
    private route: ActivatedRoute,
    public modalService: ModalService,
  ) { }

  ngOnInit() {

    this.listStatuses();

    this.route.paramMap.subscribe((data) => {
      if(data) this.getReimbursements();
    });
  }

  openModal() {
    if (this.isActive == false) {
      this.isActive = true;
    } else {
      this.isActive = false;
    }
  }

  getReimbursements() {
    const hasStatusId: boolean = this.route.snapshot.paramMap.has('id');

    if (hasStatusId) {

      this.currentStatusId = +this.route.snapshot.paramMap.get('id')!;

      this.getReimbursementByUserAndStatus(this.userId, this.currentStatusId);
    }
    this.getReimbursementByUser(this.userId);
  }

  listStatuses() {
    this.reimbService.getStatuses().subscribe({
      next:  (data: any) => {
        this.status = data;
        const reimbursements = JSON.stringify(data);
        console.log(reimbursements);
      }
    });
  }

  getReimbursementByUser(userId: string | null) {

    this.reimbService.getReimbursementByUser(userId).subscribe({
      next: (data: any) => {
        this.reimbursementDtos = data;
      }
    })
  }

  getReimbursementByUserAndStatus(userId: string | null, status: number ) {

    this.reimbService.getReimbursementByUserAndStatus(userId, status).subscribe({
      next: (data: any) => {
        this.reimbursementDtos = data;
      }
    })
  }
}
