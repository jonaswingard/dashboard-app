import {
  Component,
  OnInit,
  Input
} from '@angular/core';
import { DayInfoService } from './day-info.service';
import { IDayInfo } from './day-info';
import { WidgetComponent } from '../widget.component';

@Component({
  selector: 'app-day-info',
  providers: [ DayInfoService ],
  templateUrl: './day-info.component.html'
})
export class DayInfoComponent extends WidgetComponent implements OnInit {
  public static WidgetTitle = 'Dagens info';
  private dayInfo: IDayInfo;
  private componentTitle: string;

  constructor(private todaysNameService: DayInfoService) {
    super();
  }

  ngOnInit() {
    if (this.getSetting('Visible')) {
      this.todaysNameService.get().subscribe(info => this.dayInfo = info);
    }
  }
}
