import { Component, OnInit } from '@angular/core';
import { AddReimbursementDto } from 'src/app/models/add-reimbursement-dto';
import { ReimbursementDto } from 'src/app/models/reimbursement-dto';
import { ReimbursementService } from 'src/app/services/reimbursement.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-add-reimbursement',
  templateUrl: './add-reimbursement.component.html',
  styleUrls: ['./add-reimbursement.component.css']
})
export class AddReimbursementComponent implements OnInit {

  userId = this.userService.getUser().userId;

  reimbursementDto!: ReimbursementDto;

  constructor(
    private reimbService: ReimbursementService,
    private userService: UserService,
  ) { }

  ngOnInit() {
  }

  addReimbursement(userId: string, addReimbursementDto: AddReimbursementDto) {
    this.reimbService.addReimbursement(userId, addReimbursementDto).subscribe({
      next: (data: any) => {
        this.reimbursementDto = data;
      }
    })

  }

}
