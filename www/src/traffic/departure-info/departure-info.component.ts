import { Component, Input } from '@angular/core';

@Component({
  selector: 'traffic-departure-info',
  templateUrl: './departure-info.component.html'
})
export class DepartureInfoComponent {
  @Input() items: [{}];
  @Input() departureTitle: string;
}
