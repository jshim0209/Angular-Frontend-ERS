import { Component, Input, OnInit } from '@angular/core';
import { ReimbursementDto } from 'src/app/models/reimbursement-dto';
import { Status } from 'src/app/models/status';
import { ReimbursementService } from 'src/app/services/reimbursement.service';

@Component({
  selector: 'app-manager-home',
  templateUrl: './manager-home.component.html',
  styleUrls: ['./manager-home.component.css']
})
export class ManagerHomeComponent implements OnInit {

  @Input() status!: Status;

  reimbursementDtos!: ReimbursementDto[];
  firstName = localStorage.getItem('firstName');
  statusArray: String[] = ["Pending", "Approved", "Rejected"];
  value!: string;

  constructor(
    private reimbService: ReimbursementService,
  ) { }

  ngOnInit(): void {
    this.getAllReimbursements();
  }


  getAllReimbursements() {

    this.reimbService.getAllReimbursements().subscribe(data => {
      if(data) this.reimbursementDtos = data;
    });
  }

  filterByStatus(value: string) {
    localStorage.setItem('status', value);
    if (value == "All") {
      this.reimbService.getAllReimbursements();
    } else {
      this.reimbService.getReimbursementByStatus(this.value).subscribe(data => {
        if(data) this.reimbursementDtos = data;
      })
    }
  }

}
