import { Component, OnInit } from '@angular/core';
import { Company } from 'src/app/models/company';

import { ApiService } from 'src/app/services/api.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-company-details',
  templateUrl: './company-details.component.html',
  styleUrls: ['./company-details.component.css']
})
export class CompanyDetailsComponent implements OnInit {
  company!: Company;

  ngOnInit(): void {
    const id = parseInt(this.route.snapshot.paramMap.get('id') || '', 10);
    if (isNaN(id)) {
      console.error('Invalid employee ID:', id);
      return;
    }
    console.log('Fetching employee with ID:', id);
    this.apiService.getCompany(id).subscribe({
      next: (data: Company) => {
        this.company = data;
        console.log('Employee data:', data);
      },
      error: (err: any) => console.error('Error fetching employee:', err),
      complete: () => console.log('Employee fetch complete.'),
    });
  }

  constructor(private apiService: ApiService, private route: ActivatedRoute) {}

}
