export class Student {
  id: number;
  name: string;
  course: string;
  country?: string;
  state?: string;
  city?: string;

  constructor() {
    this.id = 0;
    this.name = '';
    this.course = '';
    this.country = '';
    this.state = '';
    this.city = '';
  }
}
