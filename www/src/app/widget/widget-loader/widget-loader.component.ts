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
import { TrafficStatusComponent } from '../widgets/traffic-status/traffic-status.component';
import { SearchLocationComponent } from '../widgets/search-location/search-location.component';
import { RealtimeComponent } from '../widgets/realtime/realtime.component';

@Component({
  selector: 'widget-loader',
  providers: [ WidgetLoaderService ],
  templateUrl: './widget-loader.component.html'
})
export class WidgetLoaderComponent implements OnInit {
  @ViewChild('componentContainer', { read: ViewContainerRef }) componentContainer;
  private widgetCollection = {
    DayInfoComponent,
    PocketComponent,
    TrafficStatusComponent,
    SearchLocationComponent,
    RealtimeComponent
  };
  private availableWidgets = [];

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private viewContainerRef: ViewContainerRef,
    private widgetLoaderService: WidgetLoaderService
  ) {}

  ngOnInit() {
    Object.keys(this.widgetCollection).forEach((key) => {
      this.availableWidgets.push({
        title: this.widgetCollection[key].WidgetTitle,
        type: key
      });
    });

    this.widgetLoaderService.$getSubject.subscribe(widgets => {
      if (widgets.widgetList) {
        for (const widget of widgets.widgetList) {
          this.addComponent(this.widgetCollection[widget.componentName], widget._id, widget.settings);
        }
      }
    });

    this.widgetLoaderService.loadWidgets('foobar');
  }

  onAddWidget(widget) {
    this.widgetLoaderService.addWidget('foobar', {
      type: widget.type,
      title: widget.title
    }).subscribe(foo => {
      console.log(foo);
    });
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

    if (componentRef.instance.onDeleteWidget) {
      componentRef.instance.onDeleteWidget.subscribe(widgetId => {
        this.widgetLoaderService.deleteWidget(widgetId).subscribe(() => {
          console.log('done');
          // componentRef.instance.settings = widget.settings;
        });
      });
    }
  }
}
