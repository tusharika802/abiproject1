import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { State } from '../class/state';
import { Observable } from 'rxjs';
import { StatesInterface } from '../city/city.component';

interface ApiResponse {
  success: boolean;
  message: string;
}

@Injectable({
  providedIn: 'root'
})
export class StateService {

 constructor(private httpClient:HttpClient) { }

 getStates(): Observable<State[]> {
     return this.httpClient.get<State[]>("https://localhost:7075/api/State");
   }
   getStatesV2(): Observable<StatesInterface[]> {
     return this.httpClient.get<StatesInterface[]>("https://localhost:7075/api/State");
   }
 
   saveState(state: State): Observable<ApiResponse> {
     return this.httpClient.post<ApiResponse>("https://localhost:7075/api/State/Upsert", state);
 
 }
 
   updateState(state: State): Observable<ApiResponse> {
     return this.httpClient.post<ApiResponse>("https://localhost:7075/api/State/Upsert", state);
   }
 
   deleteState(id: number): Observable<ApiResponse> {
     return this.httpClient.delete<ApiResponse>("https://localhost:7075/api/State/" + id);
   }
 }

