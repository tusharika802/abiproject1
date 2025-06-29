import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { City } from './city';
@Injectable({
  providedIn: 'root'
})
export class CityService {

  constructor(private httpClient:HttpClient) { }
  getCities(): Observable<City[]> {
  return this.httpClient.get<City[]>("https://localhost:7075/api/City");
}


  saveCity(city: City): Observable<any> {
    return this.httpClient.post<City>("https://localhost:7075/api/City/Upsert", city);

}

  updateCity(city: City): Observable<any> {
    return this.httpClient.post<City>("https://localhost:7075/api/City/Upsert", city);
  }

  deleteCity(id: number): Observable<any> {
    return this.httpClient.delete<City>("https://localhost:7075/api/City/" + id);
  }
}

