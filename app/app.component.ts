/**
 * Created by stefan on 9/16/16.
 */
import { Component } from '@angular/core';
import { ViewerComponent } from "./viewer.component";
import { SceneControlComponent } from "./scene-control.component"
import {RenderService} from "./render.service";
import {SceneService} from "./scene.service";

@Component({
  selector: 'three-app',
  template: `
  <scene-control></scene-control>
  <viewer style="height: 100%; width: 100%"></viewer>`,
  providers: [RenderService, SceneService]
})
export class AppComponent {

  constructor(private renderService: RenderService, private sceneLoader: SceneService) {
  }

}