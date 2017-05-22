import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { L_SEMANTIC_UI_MODULE } from 'angular2-semantic-ui';
// import { NgSemanticModule } from 'ng-semantic/ng-semantic';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { PocketComponent } from './pocket/pocket.component';
import { PocketTagComponent } from './pocket-tag/pocket-tag.component';
import { DayInfoComponent } from './day-info/day-info.component';
import { TrafficComponent } from './traffic/traffic.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    PocketComponent,
    PocketTagComponent,
    DayInfoComponent,
    TrafficComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    L_SEMANTIC_UI_MODULE
    // NgSemanticModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
