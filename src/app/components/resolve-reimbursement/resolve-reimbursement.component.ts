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

  @Input() reimbId!: number;
  @Input() resolveReimbDto!: ReimbursementDto;

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

  approveReimbursement(reimbId: number) {
    const updateStatusDto = {
      resolverId: Number(this.userId),
      statusId: 2
    };

    console.log(reimbId);
    console.log(updateStatusDto);

    this.resolveReimbursement(reimbId, updateStatusDto);
  }

  rejectReimbursement(reimbId: number) {
    const updateStatusDto = {
      resolverId: Number(this.userId),
      statusId: 3
    };

    console.log(reimbId);
    console.log(updateStatusDto);

    this.resolveReimbursement(reimbId, updateStatusDto);
  }

  resolveReimbursement(reimbId: number, updateStatusDto: UpdateStatusDto) {
    this.reimbService.updateReimbursementStatus(reimbId, updateStatusDto).subscribe({
      next: (data: any) => {
        this.reimbursementDto = data;

      }
    })

  }

}
