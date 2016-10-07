import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'
import { AppComponent }   from './app.component';
import { ViewerComponent } from "./viewer.component";
import {SceneControlComponent} from "./scene-control.component";
import {AmbientLightControlComponent} from "./ambient-light-control.component";

@NgModule({
  imports:      [ BrowserModule, FormsModule ],
  declarations: [ AppComponent, ViewerComponent, SceneControlComponent, AmbientLightControlComponent],
  bootstrap:    [ AppComponent ]
})

export class AppModule { }