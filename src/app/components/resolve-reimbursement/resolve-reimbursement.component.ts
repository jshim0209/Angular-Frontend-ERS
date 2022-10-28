import { Component, Input, OnInit } from '@angular/core';
import { ReimbursementDto } from 'src/app/models/reimbursement-dto';
import { UpdateStatusDto } from 'src/app/models/update-status-dto';
import { ModalService } from 'src/app/services/modal.service';
import { ReimbursementService } from 'src/app/services/reimbursement.service';

@Component({
  selector: 'app-resolve-reimbursement',
  templateUrl: './resolve-reimbursement.component.html',
  styleUrls: ['./resolve-reimbursement.component.css']
})
export class ResolveReimbursementComponent implements OnInit {

  @Input() reimbId: number = 0;
  reimbursementDto!: ReimbursementDto;

  reimbursementId = localStorage.getItem('reimbursementId');
  userId = localStorage.getItem('userId');
  statusId = localStorage.getItem('statusId');
  timeResolved = localStorage.getItem('timeResolved');

  constructor(
    public modalService: ModalService,
    private reimbService: ReimbursementService,
  ) { }

  ngOnInit(): void {
  }

  resolveReimbursement(reimbId: number, updateStatusDto: UpdateStatusDto) {
    this.reimbService.updateReimbursementStatus(reimbId, updateStatusDto).subscribe({
      next: (data: any) => {
        this.reimbursementDto = data;

      }
    })

  }

}
