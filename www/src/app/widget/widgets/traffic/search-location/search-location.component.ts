import {
  Component,
  OnInit,
  Input
} from '@angular/core';

import { TrafficService } from '../traffic.service';
import { WidgetComponent } from '../../widget.component';

@Component({
  selector: 'traffic-search-location',
  providers: [ TrafficService ],
  templateUrl: './search-location.component.html'
})
export class SearchLocationComponent extends WidgetComponent {
  @Input() ComponentTitle: string = 'Sök hållplats';
  items: any;
  query: string;
  selectedItem: any;

  constructor(private trafficService: TrafficService) {
    super();
    this.query = '';
  }

  onSearch() {
    this.trafficService.searchLocation(this.query).subscribe(items => this.items = items);
  }

  onSelect(item) {
    this.selectedItem = item;
  }
}
