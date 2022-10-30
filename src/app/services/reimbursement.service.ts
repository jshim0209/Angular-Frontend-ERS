import { HttpClient } from '@angular/common/http';
import { Injectable, Input } from '@angular/core';
import { map, Observable } from 'rxjs';
import { ReimbursementDto } from 'src/app/models/reimbursement-dto';
import { environment } from 'src/environments/environment';
import { Reimbursement } from '../models/reimbursement';
import { Status } from '../models/status';
import { UpdateStatusDto } from '../models/update-status-dto';

@Injectable({
  providedIn: 'root'
})
export class ReimbursementService {

  constructor(private httpClient: HttpClient) {}

  userId = localStorage.getItem('userId');
  userRole = localStorage.getItem('userRole');
  jwt = localStorage.getItem('jwt');
  status = localStorage.getItem('status');

  // get all reimbursement for manager
  getAllReimbursements() {
    const url = `${environment.BACKEND_URL}/reimbursements`;
    return this.httpClient.get<ReimbursementDto[]>(url, {
    });
  }

  // get reimbursement for individual employyee
  getReimbursementByUser(userId: string | null) {
    const url = `${environment.BACKEND_URL}/users/${userId}/reimbursements`;
    return this.httpClient.get<ReimbursementDto[]>(url, {
    });
  }

  // get reimbursement for individual employyee by status
  getReimbursementByUserAndStatus(userId: string | null, status: number) {
    const url = `${environment.BACKEND_URL}/users/${userId}/reimbursements?status=${status}`;
    return this.httpClient.get<ReimbursementDto[]>(url, {

    });
  }

  // get statuses
  getStatuses(): Observable<Status[]> {
    const url = `${environment.BACKEND_URL}/statuses`;
    return this.httpClient.get<Status[]>(url, {
    });
  }

  // get reimbursements by status for manager
  getReimbursementsByStatus(theStatusId: number) {
    const url = `${environment.BACKEND_URL}/reimbursements?status=${theStatusId}`;
    return this.httpClient.get<ReimbursementDto[]>(url, {

    });
  }

  // update reimbursement status by manager
  updateReimbursementStatus(reimbursementId: number, updateStatusDto: UpdateStatusDto) {
    const url = `${environment.BACKEND_URL}/reimbursement/${reimbursementId}`;
    const body = updateStatusDto;
    return this.httpClient.patch<Reimbursement>(url, body);
  }

}
