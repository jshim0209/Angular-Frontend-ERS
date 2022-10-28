import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ReimbursementDto } from 'src/app/models/reimbursement-dto';
import { Status } from 'src/app/models/status';
import { UpdateStatusDto } from 'src/app/models/update-status-dto';
import { ModalService } from 'src/app/services/modal.service';
import { ReimbursementService } from 'src/app/services/reimbursement.service';

@Component({
  selector: 'app-reimbursement-list',
  templateUrl: './reimbursement-list.component.html',
  styleUrls: ['./reimbursement-list.component.css']
})
export class ReimbursementListComponent implements OnInit {

  @Input() status!: Status;

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
    public modalService: ModalService
  ) { }

  ngOnInit() {

    this.listStatuses();

    this.route.paramMap.subscribe((data) => {
      this.getReimbursements();
    });
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

  getReimbursements() {
    const hasStatusId: boolean = this.route.snapshot.paramMap.has('id');

    if (hasStatusId) {

      this.currentStatusId = +this.route.snapshot.paramMap.get('id')!;

      if (this.userRole == 'employee') {
        this.getReimbursementByUserAndStatus(this.userId, this.currentStatusId);

      } else {
        this.reimbService.getReimbursementsByStatus(this.currentStatusId).subscribe(data => {
          this.reimbursementDtos = data;
        });
      }
    }
    if (this.userRole == 'employee') {
      this.getReimbursementByUser(this.userId);
    }
    else {
      this.getAllReimbursements();
    }
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

  getAllReimbursements() {

    this.reimbService.getAllReimbursements().subscribe({
      next: (data: any) => {
        this.reimbursementDtos = data;
        console.log(data);
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

  resolveReimbursement(reimbId: number, updateStatusDto: UpdateStatusDto) {
    this.reimbService.updateReimbursementStatus(reimbId, updateStatusDto).subscribe({
      next: (data: any) => {
        this.reimbursementDto = data;

      }
    })
  }

}
