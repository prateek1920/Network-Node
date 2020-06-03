import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { INodes } from './nodes';

@Injectable({
  providedIn: 'root'
})
export class NodesinfoService {
  
  constructor(private http: HttpClient) { }

  getNodesInfo(): Observable<INodes[]> {
    return this.http.get<INodes[]>('http://127.0.0.1:8080/');
  }
}
