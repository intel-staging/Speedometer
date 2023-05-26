import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { ScrollInterObserComponent } from './components/scroll-inter-obser/scroll-inter-obser.component';
import { DomChangeDirective } from './dom-change.directive';

@NgModule({
  declarations: [
    AppComponent,
    ScrollInterObserComponent,
    DomChangeDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
