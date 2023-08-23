import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Employee } from '../models/employee';
import { Company } from '../models/company';

import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  url1: string = 'https://crewcontrol.onrender.com/employee';
  url2: string = 'https://crewcontrol.onrender.com/company';
//  url3: string = 'http://localhost:5000/employee/company_name';

private nominatimApiUrl = 'https://nominatim.openstreetmap.org/search';

  constructor(private http: HttpClient) {}
  public createEmployee(data: Employee): Observable<any> {
    console.log("data")

    console.log(data.dob)
    return this.http.post<any>(this.url1, data);
  }
  public updateEmployee(data: Employee): Observable<Employee> {
    console.log("data")

    console.log(data)
    return this.http.put<any>(`${this.url1}/${data.id}`, data);
  }
  public getAllEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(this.url1);
  }
  public getEmployee(id: number): Observable<Employee> {
    console.log(`${this.url1}/${id}`)
    return this.http.get<Employee>(`${this.url1}/${id}`);
  }

  public getCompany(id: number): Observable<Company> {
    console.log(`${this.url1}/${id}`)
    return this.http.get<Company>(`${this.url2}/${id}`);
  }
 
  //getAllEmployeesByCompanyName
  public getAllEmployeesByCompanyName(company_name: string): Observable<Employee[]> {
    const body = { company_name };

    return this.http.post<Employee[]>(`${this.url1}/company_name`,body);
  }
  //resetcompanyList
  public resetcompanyList(): Observable<any[]> {
    return this.http.get<any[]>(`${this.url2}/companyNames`);
  }
  public getLatLong(address: string): Observable<any> {
    const params = {
      q: address,
      format: 'jsonv2'
    };
    return this.http.get<any[]>(this.nominatimApiUrl, { params });
  }


  public createCompany(data: any): Observable<any> {
    // data.coordinates= {
    //   "type": "Point",
    //   "coordinates": [
    //     80.237617,13.067439
    //   ]
    // }
    data.coordinates= {
      "type": "Point",
      "coordinates": [
        data.longitude,data.latitude  //latitude
      ]
    }
  
    return this.http.post<any>(this.url2, data);
  }

  public listCompanyEmp(company_name: string): Observable<any> {

    // let queryParams = new HttpParams();
    // queryParams = queryParams.append('company_name', company_name);
    // return this.http.post<Employee[]>(`${this.url1}/company_name`, {
    //   params: queryParams,
    // });

    return this.http.post<any>(`${this.url1}/company_name?company_name=${company_name}`,{
      
    });

  }
  // public listCompanyEmp(data: Company): Observable<any> {
  //   return this.http.post<any>(this.url2, data);
  // }
  public updateCompany(data: any): Observable<Employee> {
    data.coordinates= {
      "type": "Point",
      "coordinates": [
        data.longitude,data.latitude  //latitude
      ]
    }
    return this.http.put<any>(`${this.url2}/${data.id}`, data);
  }

  public getAllcompany(): Observable<Company[]> {
    return this.http.get<Company[]>(this.url2);
  }
  //deleteCompany

  public deleteCompany(id: number): Observable<Employee> {
    return this.http.delete<Employee>(`${this.url2}/${id}`);
  }
  public deleteEmployee(id: number): Observable<Employee> {
    console.log(`${id}`)
    return this.http.delete<Employee>(`${this.url1}/${id}`);
  }
}
