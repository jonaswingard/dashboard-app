import { Component, OnInit, Input } from '@angular/core';
import { DayInfoService } from './day-info.service';
import { IDayInfo } from './day-info';

@Component({
  selector: 'app-day-info',
  providers: [ DayInfoService ],
  templateUrl: './day-info.component.html'
})
export class DayInfoComponent implements OnInit {
  @Input() ComponentTitle: string = 'Idag';
  private dayInfo: IDayInfo;

  constructor(private todaysNameService: DayInfoService) { }

  ngOnInit() {
    this.todaysNameService.get().subscribe(info => this.dayInfo = info);
  }
}
