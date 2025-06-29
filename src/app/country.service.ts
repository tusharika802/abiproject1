import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Country } from './country';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CountryService {
    constructor(private httpClient:HttpClient) { }

 getCountries(): Observable<Country[]> {
     return this.httpClient.get<any>("https://localhost:7075/api/Country");
   }
 
   saveCountry(country: Country): Observable<any> {
     return this.httpClient.post<Country>("https://localhost:7075/api/Country/Upsert", country);
 
 }
 
   updateCountry(country: Country): Observable<any> {
     return this.httpClient.post<Country>("https://localhost:7075/api/Country/Upsert", country);
   }
 
   deleteCountry(id: number): Observable<any> {
     return this.httpClient.delete<Country>("https://localhost:7075/api/Country/" + id);
   }
 }