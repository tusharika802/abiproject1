export class State {
  id: number;
  name: string;
  countryName?: string;

  constructor() {
    this.id = 0;
    this.name = '';
    this.countryName = '';
  }
}
