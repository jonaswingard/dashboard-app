import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { L_SEMANTIC_UI_MODULE } from 'angular2-semantic-ui';

import { TrafficModule } from './traffic/traffic.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { PocketComponent } from './pocket/pocket.component';
import { PocketTagComponent } from './pocket/pocket-tag/pocket-tag.component';
import { DayInfoComponent } from './day-info/day-info.component';
import { UserWidgetsComponent } from './user-widgets/user-widgets.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    PocketTagComponent,
    UserWidgetsComponent,
    DayInfoComponent,
    PocketComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    TrafficModule,
    L_SEMANTIC_UI_MODULE
  ],
  entryComponents: [
    DayInfoComponent,
    PocketComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
