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
  reimbursementDtos: ReimbursementDto[] = [];
  currentStatusId: number = 0;
  statuses: Status[] = [];

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
  getReimbursements() {
    const  hasStatusId: boolean = this.route.snapshot.paramMap.has('id');

    if (hasStatusId) {
      this.currentStatusId = +this.route.snapshot.paramMap.get('id')!;
      this.reimbService.getReimbursements(this.currentStatusId).subscribe(data => {
        this.reimbursementDtos = data;
      })
    } else {
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

}
