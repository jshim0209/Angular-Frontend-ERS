import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ReimbursementDto } from 'src/app/models/reimbursement-dto';
import { Status } from 'src/app/models/status';
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
  currentStatusId: number = 0;
  statuses: Status[] = [];
  isActive: boolean = false;

  constructor(
    private reimbService: ReimbursementService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.listStatuses();

    this.route.paramMap.subscribe(() => {
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

  getReimbursements() {
    const hasStatusId: boolean = this.route.snapshot.paramMap.has('id');

    if (hasStatusId) {

      this.currentStatusId = +this.route.snapshot.paramMap.get('id')!;

      if (this.userRole == 'employee') {
        this.getReimbursementByUserAndStatus(this.userId, this.currentStatusId);

      } else {
        this.reimbService.getReimbursements(this.currentStatusId).subscribe(data => {
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
    this.reimbService.getStatuses().subscribe(data => {
      if(data) this.statuses = data;
    });
  }

  getAllReimbursements() {

    this.reimbService.getAllReimbursements().subscribe(data => {
      this.reimbursementDtos = data;
    });
  }

  getReimbursementByUser(userId: string | null) {

    this.reimbService.getReimbursementByUser(userId).subscribe({
      next: (data) => {
        this.reimbursementDtos = data;
      }
    })
  }

  getReimbursementByUserAndStatus(userId: string | null, status: number ) {

    this.reimbService.getReimbursementByUserAndStatus(userId, status).subscribe({
      next: (data) => {
        this.reimbursementDtos = data;
      }
    })
  }

}
