
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Student } from './student';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  constructor(private httpClient:HttpClient) { }
  getStudents(): Observable<Student[]> {
  return this.httpClient.get<Student[]>("https://localhost:7075/api/Student");
}


  saveStudent(student: Student): Observable<any> {
    return this.httpClient.post<Student>("https://localhost:7075/api/Student/Upsert", student);

}

  updateStudent(student: Student): Observable<any> {
    return this.httpClient.post<Student>("https://localhost:7075/api/Student/Upsert", student);
  }
getCascadingData() {
  return this.httpClient.get<any[]>('https://your-api-url.com/api/Country/GetAllWithStatesAndCities');
}

  deleteStudent(id: number): Observable<any> {
    return this.httpClient.delete<Student>("https://localhost:7075/api/Student/" + id);
  }
}
