import { Component, Input } from '@angular/core';

@Component({
  selector: 'traffic-departure-info',
  templateUrl: './departure-info.component.html'
})
export class DepartureInfoComponent {
  @Input() items: any;
  @Input() departureTitle: string;
}
