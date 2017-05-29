import { Injectable } from '@angular/core';
import { Headers, Http, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { ErrorService } from '../error/error.service';

function getTypeIcon(type) {
  switch (type) {
    case 'metro': return 'subway';
    case 'train': return 'train';
    case 'local': return 'train';
    case 'tram': return 'subway';
    case 'bus': return 'bus';
    case 'fer': return 'ship';
    default: return '';
  }
}

function getStatusIcon(item) {
  if (item.StatusIcon !== 'EventGood') {
    return 'frown red';
  }
  if (item.Events && item.Events[0].TrafficLine) {
    return 'meh yellow';
  }

  return 'smile green';
}

@Injectable()
export class TrafficService {
  private httpOptions = new RequestOptions({ headers: new Headers({ 'Content-Type': 'application/json' }) });
  private locationUrl = '/api/traffic/location';
  private realtimeUrl = '/api/traffic/realtime';
  private infoUrl = '/api/traffic/info';

  constructor(private http: Http) {}

  searchLocation(query: string): Observable<[{}]> {
    return this.http.post(this.locationUrl, { query }, this.httpOptions)
      .map(response => response.json())
      .catch(ErrorService.handleError);
  }

  getRealtime(siteId: string): Observable<[{}]> {
    return this.http.post(this.realtimeUrl, { siteid: siteId, timewindow: 5 }, this.httpOptions)
      .map(response => response.json().ResponseData)
      .catch(ErrorService.handleError);
  }

  getInfo(): Observable<any> {
    return this.http.get(this.infoUrl)
      .map(response => response.json())
      .map(data => {
        return data.map(item => {
          item.IconName = getTypeIcon(item.Type);
          item.StatusIcon = getStatusIcon(item);
          return item;
        });
      })
      .catch(ErrorService.handleError);
  }
}
