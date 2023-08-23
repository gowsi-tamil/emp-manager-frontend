import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { EmployeeDetailsComponent } from './components/employee-details/employee-details.component';
import { MaindashboardComponent } from './maindashboard/maindashboard.component';
import { AgmCoreModule } from '@agm/core';
import { CompanyDetailsComponent } from './company-details/company-details.component';

@NgModule({
  declarations: [AppComponent, DashboardComponent, EmployeeDetailsComponent, MaindashboardComponent, CompanyDetailsComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAHq2RULMYDFOn_171HMw-DBZsrCpLTQdY'
    })
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
