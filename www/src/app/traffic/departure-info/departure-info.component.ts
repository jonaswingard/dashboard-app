import {
  Component,
  Input,
  OnInit
} from '@angular/core';

@Component({
  selector: 'traffic-departure-info',
  templateUrl: './departure-info.component.html'
})
export class DepartureInfoComponent implements OnInit {
  @Input() items: any;
  @Input() departureTitle: string;

  itemsDirection1: any;
  itemsDirection2: any;

  ngOnInit() {
    // this.itemsDirection1 = this.items.filter(item => {
    //   return item.JourneyDirection === 1;
    // });
    // this.itemsDirection2 = this.items.filter(item => {
    //   return item.JourneyDirection === 2;
    // });
  }
}
