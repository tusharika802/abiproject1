import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { City } from '../class/city';

interface ApiResponse {
  success: boolean;
  message: string;
}

@Injectable({
  providedIn: 'root'
})
export class CityService {

  constructor(private httpClient:HttpClient) { }
  getCities(): Observable<City[]> {
  return this.httpClient.get<City[]>("https://localhost:7075/api/City");
}


  saveCity(city: City): Observable<any> {
    return this.httpClient.post<any>("https://localhost:7075/api/City/Upsert", city);

}

  updateCity(city: City): Observable<ApiResponse> {
    return this.httpClient.post<ApiResponse>("https://localhost:7075/api/City/Upsert", city);
  }

  // deleteCity(id: number): Observable<ApiResponse> {
  //   return this.httpClient.delete<ApiResponse>("https://localhost:7075/api/City/" + id);

  deleteCity(id: number) {
  return this.httpClient.delete(`http://localhost:5000/api/City/${id}`, {
    responseType: 'text' // <- Important
  });
}

}

