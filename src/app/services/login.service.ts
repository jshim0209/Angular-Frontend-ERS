import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginDto } from 'src/app/models/login-dto';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(
    private httpClient: HttpClient,
    ) {}

  login(loginDto: LoginDto): Observable<HttpResponse<any>> {
    return this.httpClient.post<any>(`${environment.BACKEND_URL}/login`, loginDto,
    {observe: 'response'}
    );
  }
}
