import { Component, OnInit } from '@angular/core';
import { Employee } from 'src/app/models/employee';
import { ApiService } from 'src/app/services/api.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.css'],
})
export class EmployeeDetailsComponent implements OnInit {
  employee!: Employee;


  ngOnInit(): void {
    const id = parseInt(this.route.snapshot.paramMap.get('id') || '', 10);
    if (isNaN(id)) {
      console.error('Invalid employee ID:', id);
      return;
    }
    console.log('Fetching employee with ID:', id);
    this.apiService.getEmployee(id).subscribe({
      next: (data: Employee) => {
        this.employee = data;
        console.log('Employee data:', data);
      },
      error: (err: any) => console.error('Error fetching employee:', err),
      complete: () => console.log('Employee fetch complete.'),
    });
  }
  constructor(private apiService: ApiService, private route: ActivatedRoute) {}
}
