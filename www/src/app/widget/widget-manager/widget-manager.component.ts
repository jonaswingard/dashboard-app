import {
  Component,
  OnInit,
  ViewChild,
  ComponentFactoryResolver,
  ViewContainerRef
} from '@angular/core';

import { WidgetManagerService } from './widget-manager.service';
import { DayInfoComponent } from '../widgets/day-info/day-info.component';
import { PocketComponent } from '../widgets/pocket/pocket.component';
import { TrafficStatusComponent } from '../widgets/traffic-status/traffic-status.component';
import { SearchLocationComponent } from '../widgets/search-location/search-location.component';
import { RealtimeComponent } from '../widgets/realtime/realtime.component';

@Component({
  selector: 'widget-manager',
  providers: [ WidgetManagerService ],
  templateUrl: './widget-manager.component.html'
})
export class WidgetManagerComponent implements OnInit {
  @ViewChild('componentContainer', { read: ViewContainerRef }) componentContainer;
  private widgetCollection = {
    DayInfoComponent,
    PocketComponent,
    TrafficStatusComponent,
    SearchLocationComponent,
    RealtimeComponent
  };
  private availableWidgets = [];
  private userName = 'foobar';

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private viewContainerRef: ViewContainerRef,
    private widgetManagerService: WidgetManagerService
  ) {}

  private reloadWidgets() {
    this.componentContainer.clear();
    this.widgetManagerService.loadWidgets(this.userName);
  }

  ngOnInit() {
    Object.keys(this.widgetCollection).forEach((key) => {
      this.availableWidgets.push({
        title: this.getSetting(this.widgetCollection[key].DefaultSettings, 'ComponentTitle'),
        type: key
      });
    });

    this.widgetManagerService.$getSubject.subscribe(widgets => {
      if (widgets.widgetList) {
        for (const widget of widgets.widgetList) {
          this.addComponent(this.widgetCollection[widget.componentName], widget._id, widget.settings);
        }
      }
    });

    this.widgetManagerService.loadWidgets(this.userName);
  }

  onAddWidgetEvent(widget) {
    this.widgetManagerService.addWidget(
      this.userName,
      widget.type,
      this.widgetCollection[widget.type].DefaultSettings
    ).subscribe(() => this.reloadWidgets());
  }

  private getSetting(settings: any, key: string): string {
    return settings && settings.length
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

    if (componentRef.instance.onSaveWidget) {
      componentRef.instance.onSaveWidget.subscribe(widget => {
        this.widgetManagerService.saveWidget(widget).subscribe(() => this.reloadWidgets());
      });
    }

    if (componentRef.instance.onDeleteWidget) {
      componentRef.instance.onDeleteWidget.subscribe(widgetId => {
        this.widgetManagerService.deleteWidget(widgetId).subscribe(() => this.reloadWidgets());
      });
    }
  }
}
