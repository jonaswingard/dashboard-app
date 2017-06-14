import {
  Component,
  OnInit,
  ViewChild,
  ComponentFactoryResolver,
  ViewContainerRef
} from '@angular/core';

import { WidgetLoaderService } from './widget-loader.service';
import { DayInfoComponent } from '../widgets/day-info/day-info.component';
import { PocketComponent } from '../widgets/pocket/pocket.component';
import { TrafficStatusComponent } from '../widgets/traffic/traffic-status/traffic-status.component';
import { SearchLocationComponent } from '../widgets/traffic/search-location/search-location.component';
import { RealtimeComponent } from '../widgets/traffic/realtime/realtime.component';

@Component({
  selector: 'widget-loader',
  providers: [ WidgetLoaderService ],
  templateUrl: './widget-loader.component.html'
})
export class WidgetLoaderComponent implements OnInit {
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
    private widgetLoaderService: WidgetLoaderService
  ) { }

  ngOnInit() {
    this.widgetLoaderService.$getSubject.subscribe(widgets => {
      if (widgets.widgetList) {
        for (const widget of widgets.widgetList) {
          this.addComponent(this.widgetList[widget.componentName], widget._id, widget.settings);
        }
      }
    });

    this.widgetLoaderService.loadWidgets();
  }

  private getSetting(settings: any, key: string): string {
    return settings.length
      ? settings.filter(setting => setting.name === key)[0].value
      : '';
  }

  private addComponent(component, id, settings) {
    const componentFactory = this.componentFactoryResolver
      .resolveComponentFactory(component);
    const componentRef = this.componentContainer.createComponent(componentFactory);

    componentRef.instance._id = id;
    componentRef.instance.settings = settings;
    componentRef.location.nativeElement.classList.add('widget-item');

    const widgetSize = this.getSetting(settings, 'Size');
    if (widgetSize) {
      componentRef.location.nativeElement.classList.add(widgetSize);
    }

    componentRef.changeDetectorRef.detectChanges();

    if (componentRef.instance.onSave) {
      componentRef.instance.onSave.subscribe(widget => {
        this.widgetLoaderService.saveWidget(widget).subscribe(() => {
          componentRef.instance.settings = widget.settings;
        });
      });
    }
  }
}
