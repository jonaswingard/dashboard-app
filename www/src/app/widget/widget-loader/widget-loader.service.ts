import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { ErrorService } from '../../error/error.service';

@Injectable()
export class WidgetLoaderService {
  private httpOptions = new RequestOptions({ headers: new Headers({ 'Content-Type': 'application/json' }) });
  private apiUrl = '/api/user/widgets';
  private apiSaveWidgetUrl = '/api/user/widget/save';
  private bSubject: BehaviorSubject<string>;

  private widgetsSubject: BehaviorSubject<any>;
  private widgetsRequest: Observable<any>;

  constructor(private http: Http) {
    this.widgetsSubject = new BehaviorSubject<any>({});
  }

  loadWidgets() {
    this.http.get(this.apiUrl)
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
}
