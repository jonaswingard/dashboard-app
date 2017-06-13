import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { L_SEMANTIC_UI_MODULE } from 'angular2-semantic-ui';

import { WidgetLoaderComponent } from './widget-loader/widget-loader.component';
import { WidgetEditComponent } from './widget-edit/widget-edit.component';
import { DayInfoComponent } from './widgets/day-info/day-info.component';
import { PocketComponent } from './widgets/pocket/pocket.component';
import { PocketTagComponent } from './widgets/pocket/pocket-tag/pocket-tag.component';
import { TrafficStatusComponent } from './widgets/traffic/traffic-status/traffic-status.component';
import { RealtimeComponent } from './widgets/traffic/realtime/realtime.component';
import { DepartureInfoComponent } from './widgets/traffic/departure-info/departure-info.component';
import { SearchLocationComponent } from './widgets/traffic/search-location/search-location.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    L_SEMANTIC_UI_MODULE
  ],
  declarations: [
    WidgetLoaderComponent,
    WidgetEditComponent,
    DayInfoComponent,
    PocketComponent,
    PocketTagComponent,
    TrafficStatusComponent,
    RealtimeComponent,
    DepartureInfoComponent,
    SearchLocationComponent,
  ],
  entryComponents: [
    DayInfoComponent,
    PocketComponent,
    PocketTagComponent,
    TrafficStatusComponent,
    RealtimeComponent,
    SearchLocationComponent,
  ],
  exports : [
    WidgetLoaderComponent
  ]
})
export class WidgetModule {}
