import { Injectable } from '@angular/core';
import { Headers, Http, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { ErrorService } from '../error/error.service';

@Injectable()
export class MiscService {
  httpOptions = new RequestOptions({ headers: new Headers({ 'Content-Type': 'application/json' }) });
  locationUrl = '/api/traffic/location';
  realtimeUrl = '/api/traffic/realtime';

  constructor(private http: Http) {}

  get(query: string): Observable<[{}]> {
    return this.http.post(this.locationUrl, { query }, this.httpOptions)
      .map(response => response.json())
      .catch(ErrorService.handleError);
  }

  getRealtime(siteId: string): Observable<[{}]> {
    return this.http.post(this.realtimeUrl, { siteid: siteId, timewindow: 5 }, this.httpOptions)
      .map(response => response.json().ResponseData)
      .catch(ErrorService.handleError);
  }
}
