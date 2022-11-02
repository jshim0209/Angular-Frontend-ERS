import { Component, Input, OnInit, Output, ViewChild } from '@angular/core';
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

  // @Output()
  // updatedReimbData = new EventEmitter();

  reimbursementDto!: ReimbursementDto;
  reimbursementDtos!: ReimbursementDto;
  modalOpen = this.modalService.openResolveModal;

  constructor(
    public modalService: ModalService,
    private reimbService: ReimbursementService,
    // private managerComponent: ManagerHomeComponent,
  ) { }

  ngOnInit() {
  }

  closeModal() {

    this.getAllReimbursements();
    this.modalService.openResolveModal = false;
  }

  approveReimbursement(reimbId: number) {
    const updateStatusDto = {
      resolverId: this.modalUserData.userId,
      statusId: 2
    };

    // console.log(updateStatusDto);

    this.resolveReimbursement(reimbId, updateStatusDto);
    this.modalOpen = false;
    // this.managerComponent.getAllReimbursements();
    // this.managerComponent.getAllReimbursements();
  }

  rejectReimbursement(reimbId: number) {
    const updateStatusDto = {
      resolverId: this.modalUserData.userId,
      statusId: 3
    };

    // console.log(updateStatusDto);

    this.resolveReimbursement(reimbId, updateStatusDto);
    this.modalOpen = false;
    // this.managerComponent.getAllReimbursements();
    // this.managerComponent.getAllReimbursements();
  }

  resolveReimbursement(reimbId: number, updateStatusDto: UpdateStatusDto) {
    this.reimbService.updateReimbursementStatus(reimbId, updateStatusDto).subscribe((data) => {
      if (data != null) {
        console.log(data);

        // this.updatedReimbData.emit("refresh");
      }
    });

    // this.reimbService.getAllReimbursements().subscribe({
    //   next: (data: any) => {
    //     this.reimbursementDtos = data;
    //   }
    // });
    // this.managerComponent.getAllReimbursements();
  }

  // resolveReimbursement(reimbId: number, updateStatusDto: UpdateStatusDto) {
  //   this.reimbService.updateReimbursementStatus(reimbId, updateStatusDto).subscribe({
  //     next: (data: any) => {
  //       this.reimbursementDto = data;
  //       this.getAllReimbursements();
  //     }
  //   });
  // }

  getAllReimbursements() {
    this.reimbService.getAllReimbursements().subscribe({
      next: (data: any) => {
        this.reimbursementDtos = data;
      }
    });
  }

}
