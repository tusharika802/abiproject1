import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Student } from '../class/student';

interface ApiResponse {
  success: boolean;
  message: string;
}

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  constructor(private httpClient:HttpClient) { }
  getStudents(): Observable<Student[]> {
  return this.httpClient.get<Student[]>("https://localhost:7075/api/Student");
}


  saveStudent(student: Student): Observable<ApiResponse> {
    return this.httpClient.post<ApiResponse>("https://localhost:7075/api/Student/Upsert", student);

}

  updateStudent(student: Student): Observable<ApiResponse> {
    return this.httpClient.post<ApiResponse>("https://localhost:7075/api/Student/Upsert", student);
  }


  deleteStudent(id: number): Observable<ApiResponse> {
    return this.httpClient.delete<ApiResponse>("https://localhost:7075/api/Student/" + id);
  }
}
