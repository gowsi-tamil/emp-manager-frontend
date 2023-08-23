import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CompanyDetailsComponent } from './company-details/company-details.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { EmployeeDetailsComponent } from './components/employee-details/employee-details.component';
import { MaindashboardComponent } from './maindashboard/maindashboard.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'company',
    pathMatch: 'full',
  },
  {
    path: 'employees',
    component: DashboardComponent,
  },
  {
    path: 'employees/:id',
    component: EmployeeDetailsComponent,
  },
  {
    path: 'company',
    component: MaindashboardComponent,
  },
  {
    path: 'company/:id',
    component: CompanyDetailsComponent,
  },
  // {
  //   path: 'employees/company_name',
  //   component: DashboardComponent,
  // },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
