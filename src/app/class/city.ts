import { state } from '@angular/animations';
export class City {
  id: number;
  name: string;
  stateId: number;
  stateName?:string;
  constructor() {
    this.id = 0;
    this.name = '';
    this.stateId = 0;
  }
}
