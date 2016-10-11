import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'
import { AppComponent }   from './app.component';
import { ViewerComponent } from "./viewer.component";
import { HttpModule, JsonpModule } from '@angular/http';
import {SceneControlComponent} from "./scene-control.component";
import {AmbientLightControlComponent} from "./ambient-light-control.component";
import {PointLightControlComponent} from "./point-light-control.component";
import { TabsModule } from "ng2-bootstrap/components/tabs"
import {LoginComponent} from "./login.component";

@NgModule({
  imports:      [ BrowserModule, FormsModule, TabsModule, HttpModule, JsonpModule ],
  declarations: [ AppComponent,
    ViewerComponent,
    SceneControlComponent,
    AmbientLightControlComponent,
    PointLightControlComponent,
      LoginComponent
  ],
  bootstrap:    [ AppComponent ]
})

export class AppModule { }