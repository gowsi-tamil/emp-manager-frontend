export class Employee {
  id: number = 0;
  first_name: string = '';
  last_name: string = '';
  email: string = '';
  job_title: string = '';
  dob: Date = new Date;
  company_name: string = '';
  language: string = '';
  status: boolean =true;
  preferred_color: string = '';
  reset() {
    this.id = 0;
    this.first_name = '';
    this.last_name = '';
    this.email = '';
    this.job_title = '';
    this.dob = new Date;
    this.company_name = '';
    this.language = '';
    this.status =true;
    this.preferred_color = '';
  }
}
