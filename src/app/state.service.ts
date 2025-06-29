import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { State } from './state';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StateService {

 constructor(private httpClient:HttpClient) { }

 getStates(): Observable<State[]> {
     return this.httpClient.get<State[]>("https://localhost:7075/api/State");
   }
 
   saveState(state: State): Observable<any> {
     return this.httpClient.post<State>("https://localhost:7075/api/State/Upsert", state);
 
 }
 
   updateState(state: State): Observable<any> {
     return this.httpClient.post<State>("https://localhost:7075/api/State/Upsert", state);
   }
 
   deleteState(id: number): Observable<any> {
     return this.httpClient.delete<State>("https://localhost:7075/api/State/" + id);
   }
 }

