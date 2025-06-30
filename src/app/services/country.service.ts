import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Country } from '../class/country';
import { Observable } from 'rxjs';

interface ApiResponse {
  success: boolean;
  message: string;
}

@Injectable({
  providedIn: 'root'
})
export class CountryService {
    constructor(private httpClient:HttpClient) { }

 getCountries(): Observable<Country[]> {
     return this.httpClient.get<any>("https://localhost:7075/api/Country");
   }
  getCountriesVS(): Observable<Country[]> {
       return this.httpClient.get<Country[]>("https://localhost:7075/api/Country");
     }
 
   saveCountry(country: Country): Observable<ApiResponse> {
     return this.httpClient.post<ApiResponse>("https://localhost:7075/api/Country/Upsert", country);
 
 }
 
   updateCountry(country: Country): Observable<ApiResponse> {
     return this.httpClient.post<ApiResponse>("https://localhost:7075/api/Country/Upsert", country);
   }
 
   deleteCountry(id: number): Observable<ApiResponse> {
     return this.httpClient.delete<ApiResponse>("https://localhost:7075/api/Country/" + id);
   }
 }