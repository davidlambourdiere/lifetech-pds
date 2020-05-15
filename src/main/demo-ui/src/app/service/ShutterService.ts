import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ShutterDTO} from "../dto/ShutterDTO";

@Injectable({
  providedIn: 'root'
})
export class ShutterService {

  constructor(private http: HttpClient) {
  }

  findIOTByRoom(idroom: string): Observable<any> {
    return this.http.get(`api/shutter/findByRoom/${idroom}`);
  }

  findbyId(id: bigint) :Observable<ShutterDTO>{
    return this.http.get<ShutterDTO>(`api/shutter/${id}`);
  }

  updateShutter(id: bigint , shutter: ShutterDTO): Observable<ShutterDTO> {
    return this.http.put<ShutterDTO>(`api/shutter/updateShutter/${id}`, shutter);
  }




}
