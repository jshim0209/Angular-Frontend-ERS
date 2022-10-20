import { Component, Input, OnInit } from '@angular/core';
import { ReimbursementDto } from 'src/app/models/reimbursement-dto';
import { Status } from 'src/app/models/status';
import { ReimbursementService } from 'src/app/services/reimbursement.service';

@Component({
  selector: 'app-employee-home',
  templateUrl: './employee-home.component.html',
  styleUrls: ['./employee-home.component.css']
})
export class EmployeeHomeComponent implements OnInit {

  // @Input() status!: Status;

  reimbursementDtos: ReimbursementDto[] = [];
  firstName = localStorage.getItem('firstName');
  userId = localStorage.getItem('userId');
  statuses: Status[] = [];
  selectedStatus: number = 0;


  constructor(
    private reimbService: ReimbursementService,
  ) { }

  ngOnInit(): void {
    this.listStatuses();
    this.getReimbursementByUser(this.userId);
  }

  listStatuses() {
    this.reimbService.getStatuses().subscribe(data => {
      if(data) this.statuses = data;
    });
  }

  getReimbursementByUser(userId: string | null) {

    this.reimbService.getReimbursementByUser(userId).subscribe({
      next: (data) => {
        this.reimbursementDtos = data;
      }
    })
  }

  filterByStatus(selectedStatus: number) {

    console.log(selectedStatus);

    if (selectedStatus === 4) {
      this.getReimbursementByUser(this.userId);
    } else {
      this.reimbService.getReimbursementByUserAndStatus(this.userId, selectedStatus).subscribe(data => {
        if(data) this.reimbursementDtos = data;
      })
    }
  }

  // filterByStatus(value: string) {
  //   localStorage.setItem('status', value);
  //   if (value == "All") {
  //     this.reimbService.getAllReimbursements();
  //   } else {
  //     this.reimbService.getReimbursementByStatus(this.value).subscribe(data => {
  //       if(data) this.reimbursementDtos = data;
  //     })
  //   }
  // }
}
