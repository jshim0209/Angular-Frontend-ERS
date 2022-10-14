import { HttpClient, HttpResponse } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthDto } from 'src/app/models/auth-dto';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  loginNotification:EventEmitter<void> = new EventEmitter<void>();
  logoutNotification:EventEmitter<void> = new EventEmitter<void>();

  constructor(
    private httpClient: HttpClient,
    ) {}

  authUser(authDto: AuthDto): Observable<HttpResponse<any>>{
    return this.httpClient.post<any>(
      `${environment.BACKEND_URL}/authenticate`, authDto.jwt, {observe: 'response'}
    );
  }
}
