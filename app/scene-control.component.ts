/**
 * Created by stefan on 9/16/16.
 */
import { Component } from '@angular/core';
import { ViewerComponent } from "./viewer.component";
import {RenderService} from "./render.service";
import {SceneService} from "./scene.service";

@Component({
  selector: 'scene-control',
  template: `
  <div style="position: absolute; top: 0; left: 0;">
    <h1>Tree JS Demo App</h1>
    <p [textContent]="'Intersects: ' + renderService.currentObject"></p>
    <ambient-light-control [ambientLight] = "sceneLoader.ambientLight"></ambient-light-control>
  </div>
  `
})
export class SceneControlComponent {

  constructor(private renderService: RenderService, private sceneLoader: SceneService) {

  }

}