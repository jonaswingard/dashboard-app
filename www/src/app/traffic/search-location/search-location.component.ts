import { Component, OnInit } from '@angular/core';
import { TrafficService } from '../traffic.service';

@Component({
  selector: 'traffic-search-location',
  providers: [ TrafficService ],
  templateUrl: './search-location.component.html'
})
export class SearchLocationComponent {
  items: any;
  query: string;
  selectedItem: any;

  constructor(private trafficService: TrafficService) {
    this.query = '';
  }

  onSearch() {
    this.trafficService.searchLocation(this.query).subscribe(items => this.items = items);
  }

  onSelect(item) {
    this.selectedItem = item;
  }
}