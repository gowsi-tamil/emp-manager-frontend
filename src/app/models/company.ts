export class Company {
    id: number = 0;
    company_name: string = '';
    address: string = '';
    coordinates: { type: string, coordinates: number[] } = { type: 'Point', coordinates: [] };
    reset() {
      this.id = 0;
      this.company_name = '';
      this.address = '';
      this.coordinates = { type: 'Point', coordinates: [] };

    }
  }
  