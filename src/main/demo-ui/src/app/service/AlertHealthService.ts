import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {PersonDTO} from '../dto/PersonDTO';
import {ALertHealthDTO} from "../dto/AlertHealthDTO";

@Injectable({
  providedIn: 'root'
})
export class AlertHealthService {

  constructor(private http: HttpClient) {
  }

  findAll(): Observable<ALertHealthDTO[]> {
    return this.http.get<ALertHealthDTO[]>(`api/alert/health/findAll`);
  }


 /* find(id: number) :Observable<PersonDTO>{
    return this.http.get<PersonDTO>(`api/person/findById/${id}`);
  }*/




}
