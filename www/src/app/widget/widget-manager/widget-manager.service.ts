import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { ErrorService } from '../../error/error.service';

@Injectable()
export class WidgetManagerService {
  private httpOptions = new RequestOptions({ headers: new Headers({ 'Content-Type': 'application/json' }) });
  private apiUrl = '/api/user/widgets';
  private apiSaveWidgetUrl = '/api/user/widget/save';
  private apiAddWidgetUrl = '/api/user/widget/add';
  private apiDeleteWidgetUrl = '/api/user/widget/delete';
  private bSubject: BehaviorSubject<string>;

  private widgetsSubject: BehaviorSubject<any>;
  private widgetsRequest: Observable<any>;

  constructor(private http: Http) {
    this.widgetsSubject = new BehaviorSubject<any>({});
  }

  loadWidgets(username: string) {
    this.http.post(this.apiUrl, {username})
      .map(response => response.json())
      .catch(ErrorService.handleError)
      .subscribe(
        result => {
          return this.widgetsSubject.next(result);
        },
        err => this.widgetsSubject.error(err)
      );
  }

  get $getSubject(): Observable<any> {
    return this.widgetsSubject.asObservable();
  }

  saveWidget(item): Observable<any> {
    return this.http.post(this.apiSaveWidgetUrl, {
      id: item._id,
      settings: item.settings
    }, this.httpOptions)
      .catch(ErrorService.handleError);
  }

  deleteWidget(widgetid: string): Observable<any> {
    return this.http.post(this.apiDeleteWidgetUrl, {
      widgetid
    }, this.httpOptions)
      .catch(ErrorService.handleError);
  }

  addWidget(username, item): Observable<any> {
    return this.http.post(this.apiAddWidgetUrl, {
      username,
      widget: {
        componentName: item.type,
        settings: [{
          title: 'Titel',
          value: item.title,
          type: 'text',
          name: 'ComponentTitle'
        }, {
          type: 'text',
          value: 'widget-item--small',
          title: 'Storlek',
          name: 'Size'
        }, {
          type: 'boolean',
          value: true,
          title: 'Synlig',
          name: 'Visible'
        }]
      }
    }, this.httpOptions)
      .catch(ErrorService.handleError);
  }
}
