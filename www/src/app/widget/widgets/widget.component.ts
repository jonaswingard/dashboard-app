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
  private onSave: Subject<any> = new Subject();
  private onDeleteWidget: Subject<any> = new Subject();

  constructor() {}

  onSaveWidget(updatedSettings: any): void {
    this.settings = updatedSettings;
    this.onSave.next(this);
  }

  onDeleteWidgetEvent(widgetId: string): void {
    this.onDeleteWidget.next(widgetId);
  }

  getSetting(key: string): string {
    return this.settings.length
      ? this.settings.filter(setting => setting.name === key)[0].value
      : '';
  }
}
