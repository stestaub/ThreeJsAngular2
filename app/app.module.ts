import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'
import { AppComponent }   from './app.component';
import { ViewerComponent } from "./Viewer/viewer.component";
import { HttpModule, JsonpModule } from '@angular/http';
import {SceneControlComponent} from "./Viewer/scene-control.component";
import {AmbientLightControlComponent} from "./Viewer/ambient-light-control.component";
import {PointLightControlComponent} from "./Viewer/point-light-control.component";
import { TabsModule } from "ng2-bootstrap/components/tabs"
import {LoginComponent} from "./login.component";
import {ProjectListComponent} from "./Project/project-list.component";
import {ModelViewerComponent} from "./Viewer/model-viewer.component";
import { RouterModule } from '@angular/router';
import {routes} from "./app.routes";
import {LoggedInGuard} from "./logged-in.guard";
import {UserService} from "./user.service";
import {BimServerService} from "./bim-server.service";

@NgModule({
  imports:      [ BrowserModule, FormsModule, TabsModule, HttpModule, JsonpModule, RouterModule.forRoot(routes) ],
  declarations: [ AppComponent,
    ViewerComponent,
      ModelViewerComponent,
    SceneControlComponent,
    AmbientLightControlComponent,
    PointLightControlComponent,
      LoginComponent,
      ProjectListComponent,
  ],
    providers: [LoggedInGuard, UserService, BimServerService],
  bootstrap:    [ AppComponent ]
})

export class AppModule { }