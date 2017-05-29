import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { L_SEMANTIC_UI_MODULE } from 'angular2-semantic-ui';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { PocketComponent } from './pocket/pocket.component';
import { PocketTagComponent } from './pocket-tag/pocket-tag.component';
import { DayInfoComponent } from './day-info/day-info.component';
import { TrafficStatusComponent } from './traffic/traffic-status/traffic-status.component';
import { TrafficSearchLocationComponent } from './traffic/traffic-search-location/traffic-search-location.component';
import { TrafficDepartureInfoComponent } from './traffic/traffic-departure-info/traffic-departure-info.component';
import { TrafficRealtimeComponent } from './traffic/traffic-realtime/traffic-realtime.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    PocketComponent,
    PocketTagComponent,
    DayInfoComponent,
    TrafficStatusComponent,
    TrafficRealtimeComponent,
    TrafficSearchLocationComponent,
    TrafficDepartureInfoComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    L_SEMANTIC_UI_MODULE
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
