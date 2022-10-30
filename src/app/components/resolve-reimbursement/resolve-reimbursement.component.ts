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

  @Input() modalReimbDto!: ReimbursementDto;
  @Input() modalUserData: any;

  reimbursementDto!: ReimbursementDto;

  constructor(
    public modalService: ModalService,
    private reimbService: ReimbursementService,
  ) { }

  ngOnInit() {
  }

  approveReimbursement(reimbId: number) {
    const updateStatusDto = {
      resolverId: this.modalUserData.userId,
      statusId: 2
    };

    console.log(updateStatusDto);

    this.resolveReimbursement(reimbId, updateStatusDto);
  }

  rejectReimbursement(reimbId: number) {
    const updateStatusDto = {
      resolverId: this.modalUserData.userId,
      statusId: 3
    };

    console.log(updateStatusDto);

    this.resolveReimbursement(reimbId, updateStatusDto);
  }

  resolveReimbursement(reimbId: number, updateStatusDto: UpdateStatusDto) {
    this.reimbService.updateReimbursementStatus(reimbId, updateStatusDto).subscribe({
      next: (data: any) => {
        this.reimbursementDto = data;

      }
    })
    this.reimbService.getAllReimbursements();
  }

}
