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
    this.userWidgetsService.$getSubject.subscribe(widgets => {
      if (widgets.widgetList) {
        for (const widget of widgets.widgetList) {
          this.addComponent(this.widgetList[widget.componentName], widget._id, widget.settings);
        }
      }
    });

    this.userWidgetsService.loadWidgets();
  }

  private addComponent(component, id, props) {
    const componentFactory = this.componentFactoryResolver
      .resolveComponentFactory(component);
    const componentRef = this.componentContainer.createComponent(componentFactory);
    componentRef.location.nativeElement.classList.add('widget-item');
    componentRef.instance._id = id;
    componentRef.instance.settings = {};

    if (componentRef.instance.onSave) {
      componentRef.instance.onSave.subscribe(widget => {
        this.userWidgetsService.saveWidget(widget).subscribe(() => {
          console.log(widget);
          componentRef.instance.settings = widget.settings;
        });
      });
    }

    Object.keys(props).forEach(function (key) {
      if (key === 'Size') {
        componentRef.location.nativeElement.classList.add(props[key]);
      }
      componentRef.instance.settings[key] = props[key];
    });

    componentRef.changeDetectorRef.detectChanges();
  }
}
