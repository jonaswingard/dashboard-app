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
  private dayInfo: IDayInfo;

  constructor(private todaysNameService: DayInfoService) {
    super();
  }

  ngOnInit() {
    if (!this.settings.Hidden) {
      this.todaysNameService.get().subscribe(info => this.dayInfo = info);
    }
  }
}
