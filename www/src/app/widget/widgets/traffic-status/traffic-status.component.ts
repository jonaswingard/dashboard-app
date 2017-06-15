import {
  Component,
  OnInit,
  Input
} from '@angular/core';

import { TrafficService } from '../traffic/traffic.service';
import { WidgetComponent } from '../widget.component';

@Component({
  selector: 'traffic-status',
  providers: [ TrafficService ],
  templateUrl: './traffic-status.component.html'
})
export class TrafficStatusComponent extends WidgetComponent implements OnInit {
  public static get DefaultSettings() {
    return [
      ...WidgetComponent.UpdateSetting('ComponentTitle', 'Trafikstatus')
    ];
  }
  private trafficStatus: any;

  constructor(private trafficService: TrafficService) {
    super();
  }

  ngOnInit() {
    if (this.getSetting('Visible')) {
      this.trafficService.getInfo().subscribe(trafficStatus => this.trafficStatus = trafficStatus);
    }
  }
}
