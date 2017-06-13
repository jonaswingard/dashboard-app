import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { L_SEMANTIC_UI_MODULE } from 'angular2-semantic-ui';

import { TrafficModule } from './widgets/traffic/traffic.module';

import { WidgetLoaderComponent } from './widget-loader/widget-loader.component';
import { WidgetEditComponent } from './widget-edit/widget-edit.component';
import { DayInfoComponent } from './widgets/day-info/day-info.component';
import { PocketComponent } from './widgets/pocket/pocket.component';
import { PocketTagComponent } from './widgets/pocket/pocket-tag/pocket-tag.component';
import { TrafficStatusComponent } from './widgets/traffic/traffic-status/traffic-status.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    TrafficModule,
    L_SEMANTIC_UI_MODULE
  ],
  declarations: [
    WidgetLoaderComponent,
    WidgetEditComponent,
    DayInfoComponent,
    PocketComponent,
    PocketTagComponent,
    TrafficStatusComponent,
  ],
  entryComponents: [
    DayInfoComponent,
    PocketComponent,
    PocketTagComponent,
    TrafficStatusComponent,
  ],
  exports : [
    WidgetLoaderComponent
  ]
})
export class WidgetModule {}
