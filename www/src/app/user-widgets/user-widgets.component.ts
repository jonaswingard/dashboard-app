import {
  Component,
  OnInit,
  ViewChild,
  ComponentFactoryResolver,
  ViewContainerRef
} from '@angular/core';

import { UserWidgetsService } from './user-widgets.service';
import { DayInfoComponent } from '../day-info/day-info.component';
import { PocketComponent } from '../pocket/pocket.component';
import { TrafficStatusComponent } from '../traffic/traffic-status/traffic-status.component';
import { SearchLocationComponent } from '../traffic/search-location/search-location.component';
import { RealtimeComponent } from '../traffic/realtime/realtime.component';

@Component({
  selector: 'app-user-widgets',
  providers: [ UserWidgetsService ],
  templateUrl: './user-widgets.component.html'
})
export class UserWidgetsComponent implements OnInit {
  @ViewChild('componentContainer', { read: ViewContainerRef }) componentContainer;
  private widgetList = {
    DayInfoComponent,
    PocketComponent,
    TrafficStatusComponent,
    SearchLocationComponent,
    RealtimeComponent
  };

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private viewContainerRef: ViewContainerRef,
    private userWidgetsService: UserWidgetsService
  ) { }

  ngOnInit() {
    this.userWidgetsService.getWidgets().subscribe(widgets => {
      for (const widget of widgets) {
        this.addComponent(this.widgetList[widget.componentName], widget.settings);
      }
    });
  }

  private addComponent(component, props) {
    if (props.Hidden === true) {
      return;
    }

    const componentFactory = this.componentFactoryResolver
      .resolveComponentFactory(component);
    const componentRef = this.componentContainer.createComponent(componentFactory);
    componentRef.location.nativeElement.classList.add('widget-item');

    Object.keys(props).forEach(function (key) {
      if (key === 'Size') {
        componentRef.location.nativeElement.classList.add(props[key]);
      } else if (key !== 'Hidden') {
        componentRef.instance[key] = props[key];
      }
    });

    componentRef.changeDetectorRef.detectChanges();
  }
}
