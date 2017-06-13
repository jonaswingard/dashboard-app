import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { L_SEMANTIC_UI_MODULE } from 'angular2-semantic-ui';

import { TrafficModule } from './widgets/traffic/traffic.module';

import { WidgetLoaderComponent } from './widget-loader/widget-loader.component';
import { DayInfoComponent } from './widgets/day-info/day-info.component';
import { PocketComponent } from './widgets/pocket/pocket.component';
import { PocketTagComponent } from './widgets/pocket/pocket-tag/pocket-tag.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    TrafficModule,
    L_SEMANTIC_UI_MODULE
  ],
  declarations: [
    WidgetLoaderComponent,
    DayInfoComponent,
    PocketComponent,
    PocketTagComponent,
  ],
  entryComponents: [
    DayInfoComponent,
    PocketComponent,
    PocketTagComponent,
  ],
  exports : [
    WidgetLoaderComponent
  ]
})
export class WidgetModule {}
