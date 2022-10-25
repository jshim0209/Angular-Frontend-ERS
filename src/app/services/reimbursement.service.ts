import { HttpClient } from '@angular/common/http';
import { Injectable, Input } from '@angular/core';
import { map, Observable } from 'rxjs';
import { ReimbursementDto } from 'src/app/models/reimbursement-dto';
import { environment } from 'src/environments/environment';
import { Status } from '../models/status';

@Injectable({
  providedIn: 'root'
})
export class ReimbursementService {

  constructor(private httpClient: HttpClient) {}

  userId = localStorage.getItem('userId');
  userRole = localStorage.getItem('userRole');
  jwt = localStorage.getItem('jwt');
  status = localStorage.getItem('status');

  getAllReimbursements() {
    const url = `${environment.BACKEND_URL}/reimbursements`;
    return this.httpClient.get<ReimbursementDto[]>(url, {
    });
  }

  getReimbursementByUser(userId: string | null) {
    const url = `${environment.BACKEND_URL}/users/${userId}/reimbursements`;
    return this.httpClient.get<ReimbursementDto[]>(url, {
    });
  }

  getReimbursementByStatus(status: number) {
    const url = `${environment.BACKEND_URL}/reimbursements?status=${status}`;
    return this.httpClient.get<ReimbursementDto[]>(url, {

    });
  }

  getReimbursementByUserAndStatus(userId: string | null, status: number) {
    const url = `${environment.BACKEND_URL}/users/${userId}/reimbursements?status=${status}`;
    return this.httpClient.get<ReimbursementDto[]>(url, {

    });
  }

  getStatuses(): Observable<Status[]> {
    const url = `${environment.BACKEND_URL}/statuses`;
    return this.httpClient.get<Status[]>(url, {
    });
  }

  getReimbursements(theStatusId: number) {
    const url = `${environment.BACKEND_URL}/reimbursements?status=${theStatusId}`;
    return this.httpClient.get<ReimbursementDto[]>(url, {

    });
  }

}
