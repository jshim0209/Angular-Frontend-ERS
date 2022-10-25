import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { EmployeeHomeComponent } from './components/employee-home/employee-home.component';
import { HomeComponent } from './components/home/home.component';
import { ManagerHomeComponent } from './components/manager-home/manager-home.component';
import { LoginComponent } from './components/login/login.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ReimbursementListComponent } from './components/reimbursement-list/reimbursement-list.component';
import { ReceiptModalComponent } from './components/receipt-modal/receipt-modal.component';
import { ResolveReimbursementComponent } from './components/resolve-reimbursement/resolve-reimbursement.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    EmployeeHomeComponent,
    HomeComponent,
    ManagerHomeComponent,
    LoginComponent,
    RegistrationComponent,
    ReimbursementListComponent,
    ReceiptModalComponent,
    ResolveReimbursementComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
