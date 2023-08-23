import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { Employee } from 'src/app/models/employee';
import { ApiService } from 'src/app/services/api.service';
//import { Router } from '@angular/router';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  employeeForm!: FormGroup;
  listEmployee!: Employee[];
  editing!: boolean;
  selectedCompany!:any
  // companyList = [
  //   { id: 24699, company_name: 'ABC Company' },
  //   { id: 2, company_name: 'XYZ Corporation' },
  //   { id: 3, company_name: '123 Industries' }
  // ];
  companyList!:any;
  companyName!: string;
  employeeObj!: Employee;
  ngOnInit(): void {
    this.initForm();
  }
  constructor(private apiService: ApiService, private router: Router, private route: ActivatedRoute) {
    this.resetcompanyList();
    this.resetEmployeeList();
    this.editing = false;
    this.employeeObj = new Employee();
  }
  // private resetEmployeeList() {
  //   this.apiService.getAllEmployees().subscribe((result) => {
  //     this.listEmployee = result;
  //   });
  // }
  private resetEmployeeList() {
    this.route.queryParams.subscribe((params) => {
      const company_name = params['company_name'];
      this.companyName = params['company_name']
      this.apiService.getAllEmployeesByCompanyName(company_name).subscribe((result) => {
        this.listEmployee = result;
      });
    });
  }
  private resetcompanyList() {
    // this.route.queryParams.subscribe((params) => {
    //   const company_name = params['company_name'];
    //   this.companyName = params['company_name']
      this.apiService.resetcompanyList().subscribe((result) => {
        this.companyList = result;
      });
    // });
  }
  public deleteEmployee(employee: Employee) {
   
    this.apiService
      .deleteEmployee(employee.id)
      .subscribe({
        next: (result) => {
          console.log(result);
          this.resetEmployeeList();
          alert('Employee Deleted!');
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
  private initForm() {
    this.employeeForm = new FormGroup({
      first_name: new FormControl(null),
      last_name: new FormControl(null),
      email: new FormControl(null),
      job_title: new FormControl(null),
      dob: new FormControl(null),
      company_name: new FormControl(null),
      language: new FormControl(null),
      status: new FormControl(null),
      preferred_color: new FormControl(null),
    });
  }
  public addEmployee() {
    this.employeeObj.reset();
    this.employeeForm.value.company_name = this.companyName 
   
    if(this.employeeForm.value.first_name==null || this.employeeForm.value.first_name==""){
      alert('Please enter a First Name');
      return
    }else if(this.employeeForm.value.last_name==null || this.employeeForm.value.last_name==""){
      alert('Please enter a Last Name');
      return
    }else if(this.employeeForm.value.status==null ||this.employeeForm.value.status==""){
      alert('Please enter a status');
      return
    }


    this.apiService
      .createEmployee(Object.assign(this.employeeObj, this.employeeForm.value))
      .subscribe({
        next: (result) => {
          console.log(result);
          this.resetEmployeeList();
          alert('employee added!');
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
  public updateEmployee() {
    //this.employeeObj.first_name = this.employeeForm.value.first_name;
    //this.employeeObj.last_name = this.employeeForm.value.last_name;
    console.log( this.employeeForm.value.last_name)
    console.log("id" )
    if(this.employeeForm.value.first_name==null || this.employeeForm.value.first_name==""){
      alert('Please enter a First Name');
      return
    }else if(this.employeeForm.value.last_name==null || this.employeeForm.value.last_name==""){
      alert('Please enter a Last Name');
      return
    }else if(this.employeeForm.value.status==null || this.employeeForm.value.status==""){
      alert('Please enter a status');
      return
    }
    this.apiService
      .updateEmployee(
        Object.assign({ id: this.employeeObj.id }, this.employeeForm.value)
      )
      .subscribe({
        next: (result) => {
          console.log(result);
          this.resetEmployeeList();
          alert('employee updated!');
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

  public moveemployee(company_name:any,id:any) {
    console.log("selectedCompany")

    console.log(company_name)// this.employeeObj.id,
    console.log(id)// this.employeeObj.id,

    console.log("selectedCompany2")

    this.apiService
      .updateEmployee(
        Object.assign({ id:id,company_name})
      )
      .subscribe({
        next: (result) => {
          console.log(result);
          this.resetEmployeeList();
          alert('employee moved!');
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
  


  public onEditEmployee(employee: Employee, event: any) {
    event.stopPropagation();
    this.employeeObj.reset();
    this.employeeObj.id = employee.id;
    this.editing = true;
    this.employeeForm.patchValue(employee);
  }
  public onSelect(employee: Employee) {
    this.router.navigate([`employees`, employee.id]);
  }

}
