import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { TrafficStatusComponent } from './traffic-status/traffic-status.component';
import { SearchLocationComponent } from './search-location/search-location.component';
import { DepartureInfoComponent } from './departure-info/departure-info.component';
import { RealtimeComponent } from './realtime/realtime.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: [
    TrafficStatusComponent,
    SearchLocationComponent,
    DepartureInfoComponent,
    RealtimeComponent
  ],
  entryComponents: [
    TrafficStatusComponent,
    SearchLocationComponent,
    RealtimeComponent
  ]
})
export class TrafficModule {}
