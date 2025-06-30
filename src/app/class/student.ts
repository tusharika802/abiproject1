export class Student {
  id: number;
  name: string;
  course: string;
  country?: any; 
  state?: any;
  city?: any

  constructor() {
    this.id = 0;
    this.name = '';
    this.course = '';
    this.country = '';
    this.state = '';
    this.city = '';
  }
}

// export interface StudentInterface {
//   id: number;
//   name: string;
//   course: string;
//   country?: string | { id: number; name: string };
//   state?: string | { id: number; name: string };
//   city?: string | { id: number; name: string };
// }
