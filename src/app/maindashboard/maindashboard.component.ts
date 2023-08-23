import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { Company } from 'src/app/models/company';
import { Employee } from 'src/app/models/employee';

import { ApiService } from 'src/app/services/api.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-maindashboard',
  templateUrl: './maindashboard.component.html',
  styleUrls: ['./maindashboard.component.css']
})
export class MaindashboardComponent implements OnInit{
  companyForm!: FormGroup;
  listCompany!: Company[];
  employeeForm!: FormGroup;
  listEmployee!: Employee[];
  editing!: boolean;
  companyObj!: Company;
  latitude: any;
  longitude: any; 
  ngOnInit(): void {
    this.initForm();
  }

  constructor(private apiService: ApiService, private router: Router,private http: HttpClient) {
    this.resetcompanyList();
    this.editing = false;
    this.companyObj = new Company();
  }
  private resetcompanyList() {
    this.apiService.getAllcompany().subscribe((result) => {
      this.listCompany = result;
    });
  }
  public onSelect(company: Company) {
    this.router.navigate([`company`, company.id]);
  }
 

  public onChoseLocation(event: any){
    console.log(event)
    // this.latitude=event.coords.lat;
    // this.longitude=event.coords.lng;
  }
  private initForm() {
    this.companyForm = new FormGroup({
      company_name: new FormControl(null),
      address: new FormControl(null),

    });
  }
  // public addCompany() {
  //   this.companyObj.reset();
   
  //   console.log(this.companyForm.value.address)
  //   let address = this.companyForm.value.address
  //   this.apiService
  //     .createCompany(Object.assign(this.companyObj, this.companyForm.value))
  //     .subscribe({
  //       next: (result) => {
  //         this.resetcompanyList();
  //         alert('company added!');
  //       },
  //       error: (e) => {
  //         alert(e);
  //       },
  //       complete: () => {
  //         const ref = document.getElementById('cancel-modal');
  //         ref?.click();
  //         this.editing = false;
  //       },
  //     });
  // }

  addCompany() {
    this.companyObj.reset();
    const address = this.companyForm.value.address;

    console.log(this.companyForm.value.company_name)
    if(this.companyForm.value.company_name==null || this.companyForm.value.company_name==""){
      alert('Please enter a Company Name');
      return
    }else if(address==null || address==null){
      alert('Please enter a Company address');
      return
    }
    this.apiService.getLatLong(address).subscribe({
      next: (result) => {
        if(result.length==0){
          alert('Please enter correct Company address');
          return   
        }
        const lat = result[0].lat;
        const lon = result[0].lon;
        console.log("thisis mass")

        this.companyForm.patchValue({ lat, lon });
        console.log(this.companyForm.value)
        console.log(lat)

        this.companyForm.value.latitude = lat
        this.companyForm.value.longitude = lon
        console.log(this.companyForm.value)

        this.apiService.createCompany(Object.assign(this.companyObj, this.companyForm.value))
          .subscribe({
            next: (result) => {
              this.resetcompanyList();
              alert('company added!');
            },
            error: (e) => {
              alert(e);
            },
            complete: () => {
              const ref = document.getElementById('cancel-modal');
              ref?.click();
              this.editing = false;
            },
          });
      },
      error: (e) => {
        alert('Unable to geocode address: ' + e);
      }
    });
  }




  public updateCompany() {
    //this.employeeObj.first_name = this.employeeForm.value.first_name;
    //this.employeeObj.last_name = this.employeeForm.value.last_name;
    const address = this.companyForm.value.address;
    if(this.companyForm.value.company_name==null || this.companyForm.value.company_name==""){
      alert('Please enter a Company Name');
      return
    }else if(address==null || address==""){
      alert('Please enter a Company address');
      return
    }
    this.apiService.getLatLong(address).subscribe({
      next: (result) => {
        if(result.length==0){
          alert('Please enter correct Company address');
          return   
        }
        const lat = result[0].lat;
        const lon = result[0].lon;
        console.log("thisis mass")

console.log(this.companyForm.value)
        this.companyForm.patchValue({ lat, lon });
        this.companyForm.value.latitude = lat
        this.companyForm.value.longitude = lon
        console.log(this.companyForm.value)
    
    this.apiService
      .updateCompany(
        Object.assign({ id: this.companyObj.id }, this.companyForm.value)
      )
      .subscribe({
        next: (result) => {
          console.log(result);
          this.resetcompanyList();
          alert('company updated!');
        },
        error: (e) => {
          alert(e);
        },
        complete: () => {
          const ref = document.getElementById('cancel-modal');
          ref?.click();
          this.editing = false;
        },
      });
    }
    });
  
  }
  public deleteCompany(company: Company) {
   
    this.apiService
      .deleteCompany(company.id)
      .subscribe({
        next: (result) => {
          console.log(result);
          this.resetcompanyList();
          alert('company Deleted!');
        },
        error: (e) => {
          alert(e);
        },
        complete: () => {
          const ref = document.getElementById('cancel-modal');
          ref?.click();
          this.editing = false;
        },
      });
  }
  public onEditCompany(company: Company, event: any) {
    event.stopPropagation();
    this.companyObj.reset();
    this.companyObj.id = company.id;
    this.editing = true;
    this.companyForm.patchValue(company);
  }
  private resetEmployeeList() {
    this.apiService.getAllEmployees().subscribe((result) => {
      this.listEmployee = result;
    });
  }
  public onListEmployee(company: Company, event: any) {
console.log(company)
    this.apiService.listCompanyEmp(company.company_name).subscribe((result) => {
      this.listEmployee = result;
      this.resetEmployeeList();

    });
  }

  // public onListEmployee(e: any) {
  //   console.log(e.target.value);
  //   this.apiService
  //     .listCompanyEmp(e.target.value)
  //     .subscribe((filteredList) => {
  //       this.listEmployee = filteredList;
  //     });
  // }
}
