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

  public static get DefaultSettings() {
    return [{
      title: 'Titel',
      value: 'Standard widget',
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
    }];
  }

  public settings;
  private onSaveWidget: Subject<any> = new Subject();
  private onDeleteWidget: Subject<any> = new Subject();

  public static UpdateSetting(name, value) {
    return WidgetComponent.DefaultSettings.map(setting => {
      if (setting.name === name) {
        setting.value = value;
      }
      return setting;
    });
  }

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

    if (this.settings && this.settings.length) {
      const filteredSetting = this.settings.filter(setting => setting.name === key);
      if (filteredSetting.length) {
        return filteredSetting[0].value;
      }
    }

    return '';
  }
}
