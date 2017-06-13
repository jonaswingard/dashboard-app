import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { SearchLocationComponent } from './search-location/search-location.component';
import { DepartureInfoComponent } from './departure-info/departure-info.component';
import { RealtimeComponent } from './realtime/realtime.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: [
    SearchLocationComponent,
    DepartureInfoComponent,
    RealtimeComponent
  ],
  entryComponents: [
    SearchLocationComponent,
    RealtimeComponent
  ]
})
export class TrafficModule {}
