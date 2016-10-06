import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent }   from './app.component';
import {ViewerComponent} from "./viewer.component";

@NgModule({
  imports:      [ BrowserModule ],
  declarations: [ AppComponent, ViewerComponent],
  bootstrap:    [ AppComponent ]
})

export class AppModule { }