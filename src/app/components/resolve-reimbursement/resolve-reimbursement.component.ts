import { Component, OnInit } from '@angular/core';
import { ModalService } from 'src/app/services/modal.service';

@Component({
  selector: 'app-resolve-reimbursement',
  templateUrl: './resolve-reimbursement.component.html',
  styleUrls: ['./resolve-reimbursement.component.css']
})
export class ResolveReimbursementComponent implements OnInit {

  constructor(
    public modalService: ModalService
  ) { }

  ngOnInit(): void {
  }

}
