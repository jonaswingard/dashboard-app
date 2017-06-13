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

@Component({
  selector: 'app-day-info',
  providers: [ DayInfoService ],
  templateUrl: './day-info.component.html'
})
export class DayInfoComponent implements OnInit {
  @Input() ComponentTitle: string = 'Idag';
  onSave: Subject<any> = new Subject();

  private dayInfo: IDayInfo;
  private selected;
  private settings;

  constructor(
    private todaysNameService: DayInfoService
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
