export class State {
  id: number;
  name: string;
  countryName?: string;
   countryId : number = 0;

  constructor() {
    this.id = 0;
    this.name = '';
    this.countryName = '';
   
  }
}
