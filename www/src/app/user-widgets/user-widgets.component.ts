import {
  Component,
  OnInit,
  ViewChild,
  ComponentFactoryResolver,
  ViewContainerRef
} from '@angular/core';

import { DayInfoComponent } from '../day-info/day-info.component';
import { PocketComponent } from '../pocket/pocket.component';
import { TrafficStatusComponent } from '../traffic/traffic-status/traffic-status.component';
import { SearchLocationComponent } from '../traffic/search-location/search-location.component';
import { RealtimeComponent } from '../traffic/realtime/realtime.component';

@Component({
  selector: 'app-user-widgets',
  templateUrl: './user-widgets.component.html'
})
export class UserWidgetsComponent implements OnInit {
  @ViewChild('componentContainer', { read: ViewContainerRef }) componentContainer;
  private title = 'My Dashboard';

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private viewContainerRef: ViewContainerRef
  ) { }

  ngOnInit() {
    const componentList = {
      DayInfoComponent,
      PocketComponent,
      TrafficStatusComponent,
      SearchLocationComponent,
      RealtimeComponent
    };

    const mockData = [{
      componentName: 'DayInfoComponent',
      settings: { ComponentTitle: 'Idag' }
    }, {
      componentName: 'PocketComponent',
      settings: { ComponentTitle: 'Mina pockets', Limit:  3 }
    }, {
      componentName: 'TrafficStatusComponent',
      settings: { ComponentTitle: 'Trafikläget i stan' }
    }, {
      componentName: 'SearchLocationComponent',
      settings: { ComponentTitle: 'Sök hållplats' }
    }, {
      componentName: 'RealtimeComponent',
      settings: { ComponentTitle: 'Östermalmstorg', SiteId: '9206' }
    }];

    for (const comp of mockData) {
      this.addComponent(componentList[comp.componentName], comp.settings);
    }
  }

  private addComponent(component, props?) {
    const componentFactory = this.componentFactoryResolver
      .resolveComponentFactory(component);
    const componentRef = this.componentContainer.createComponent(componentFactory);

    // Set the properties if any
    if (props) {
      Object.keys(props).forEach(function (key) {
        componentRef.instance[key] = props[key];
      });
    }

    componentRef.changeDetectorRef.detectChanges();
  }
}
