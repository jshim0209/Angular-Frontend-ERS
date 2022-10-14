import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { SignUpDto } from 'src/app/models/sign-up-dto';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

    constructor(
    private httpClient: HttpClient
  ) { }

  register(signUpDto: SignUpDto): Observable<HttpResponse<any>> {
    return this.httpClient.post<any>(`${environment.BACKEND_URL}/signUp`, signUpDto,
    {observe:'response'
  });
  };
}
