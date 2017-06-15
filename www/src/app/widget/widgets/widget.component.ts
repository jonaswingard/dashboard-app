import {
  Component,
  OnInit,
  Input
} from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Component({
  selector: 'widget'
})
export class WidgetComponent {
  public static WidgetTitle = 'Widget';
  public settings;
  private onSaveWidget: Subject<any> = new Subject();
  private onDeleteWidget: Subject<any> = new Subject();

  constructor() {}

  onSaveWidgetEvent(updatedSettings: any): void {
    this.settings = updatedSettings;
    this.onSaveWidget.next(this);
  }

  onDeleteWidgetEvent(widgetId: string): void {
    this.onDeleteWidget.next(widgetId);
  }

  getSetting(key: string): string {
    if (typeof this.settings === 'undefined') {
      console.error('No settings defined');
    }
    return this.settings && this.settings.length
      ? this.settings.filter(setting => setting.name === key)[0].value
      : '';
  }
}
