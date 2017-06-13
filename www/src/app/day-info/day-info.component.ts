import {
  Component,
  OnInit,
  EventEmitter,
  Input,
  Output
} from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { DayInfoService } from './day-info.service';
import { IDayInfo } from './day-info';
import { UserWidgetsService } from '../user-widgets/user-widgets.service';
import { UserWidgetsComponent } from '../user-widgets/user-widgets.component';

@Component({
  selector: 'app-day-info',
  providers: [ DayInfoService, UserWidgetsService ],
  templateUrl: './day-info.component.html'
})
export class DayInfoComponent implements OnInit {
  @Input() ComponentTitle: string = 'Idag';
  onSave: Subject<any> = new Subject();

  private dayInfo: IDayInfo;
  private selected;
  private settings;

  constructor(
    private todaysNameService: DayInfoService,
    private userWidgetsService: UserWidgetsService
  ) { }

  ngOnInit() {
    if (!this.settings.Hidden) {
      this.todaysNameService.get().subscribe(info => this.dayInfo = info);
    }
  }

  onEditSettings(settings) {
    this.selected = { ...settings };
  }

  onSaveSettings() {
    this.settings = this.selected;
    this.onSave.next(this);
    delete this.selected;
  }
}
