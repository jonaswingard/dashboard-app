import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class PocketService {
  private apiUrl = '/api/pocket?limit=5';

  constructor(private http: Http) { }

  get(): Observable<Object[]> {
    return this.http.get(this.apiUrl)
      .map(response => response.json());
  }

}
