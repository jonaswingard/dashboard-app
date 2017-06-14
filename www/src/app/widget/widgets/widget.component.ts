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
  onSave: Subject<any> = new Subject();

  public settings;

  constructor() {}

  onSaveWidget(updatedSettings: any): void {
    this.settings = updatedSettings;
    this.onSave.next(this);
  }

  getSetting(key: string): string {
    return this.settings.length
      ? this.settings.filter(setting => setting.name === key)[0].value
      : '';
  }
}
