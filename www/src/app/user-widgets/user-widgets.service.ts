import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { ErrorService } from '../error/error.service';

@Injectable()
export class UserWidgetsService {
  private httpOptions = new RequestOptions({ headers: new Headers({ 'Content-Type': 'application/json' }) });
  private apiUrl = '/api/user/widgets';

  constructor(private http: Http) {}

  getWidgets(): Observable<any>  {
    return this.http.get(this.apiUrl)
      .map(response => response.json())
      .catch(ErrorService.handleError);
  }
}
