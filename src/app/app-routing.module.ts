import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeHomeComponent } from './components/employee-home/employee-home.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { ManagerHomeComponent } from './components/manager-home/manager-home.component';
import { ReceiptModalComponent } from './components/receipt-modal/receipt-modal.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { ReimbursementListComponent } from './components/reimbursement-list/reimbursement-list.component';

const routes: Routes = [

  { path: 'receipt', component: ReceiptModalComponent },
  { path: 'registration', component: RegistrationComponent },
  { path:'manager-home', component: ManagerHomeComponent},
  { path:'employee-home', component: EmployeeHomeComponent},
  { path: 'status/:id', component: ReimbursementListComponent },
  { path: 'status', component: ReimbursementListComponent },
  { path: 'reimbursements', component: ReimbursementListComponent },
  { path:'login', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', redirectTo: '/home', pathMatch: 'full' },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
