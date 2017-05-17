import { Injectable } from '@angular/core';
import { Headers, Http, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { IDayInfo } from './day-info';

@Injectable()
export class DayInfoService {
  private httpOptions = new RequestOptions({ headers: new Headers({ 'Content-Type': 'application/json' }) });
  private apiUrl = '/api/dayinfo';

  constructor(private http: Http) {}

  get(): Observable<IDayInfo>  {
    return this.http.get(this.apiUrl)
      .map(response => response.json().dagar[0])
      .map(data => {
        return <IDayInfo>{
          vacant: data['röd dag'],
          dayOfWeek: data['dag i vecka'],
          date: data['datum'],
          flagday: data['flaggdag'],
          redDay: data['röd dag'],
          weekNumber: data['vecka'],
          weekDay: data['veckodag'],
          todaysNames: data['namnsdag']
        };
      })
      .catch(this.handleError);
  }

  private handleError(error: Response) {
    console.error(error);
    return Observable.throw(error.json().error || 'Server error');
  }
}
