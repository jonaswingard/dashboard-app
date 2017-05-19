import { Injectable } from '@angular/core';
import { Headers, Http, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { ITraffic } from './traffic';
import { ErrorService } from '../error/error.service';

@Injectable()
export class TrafficService {
  private httpOptions = new RequestOptions({ headers: new Headers({ 'Content-Type': 'application/json' }) });
  private apiUrl = '/api/traffic/info';

  constructor(private http: Http) {}

  private getTypeIcon(type) {
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

  private getStatusIcon(item) {
    if (item.StatusIcon !== 'EventGood') {
      return 'frown red';
    }
    if (item.Events && item.Events[0].TrafficLine) {
      return 'meh yellow';
    }

    return 'smile green';
  }

  get(): Observable<ITraffic> {
    return this.http.get(this.apiUrl)
      .map(response => response.json())
      .map(data => {
        return data.map(item => {
          item.IconName = this.getTypeIcon(item.Type);
          item.StatusIcon = this.getStatusIcon(item);
          console.log(item);
          return item;
        });
      })
      .catch(ErrorService.handleError);
  }
}
