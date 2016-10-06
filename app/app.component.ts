/**
 * Created by stefan on 9/16/16.
 */
import { Component } from '@angular/core';
import { ViewerComponent } from "./viewer.component";
import {RenderService} from "./render.service";
import {SceneService} from "./scene.service";

@Component({
  selector: 'three-app',
  template: `
  <div style="position: absolute; top: 0; left: 0;">
    <h1>Tree JS Demo App</h1>
    <p [textContent]="'Intersects: ' + _renderService.currentObject"></p>
    <button class="btn btn-sm" (click)="_sceneLoader.turnOnAmbientLight()">Light on</button>
    <button class="btn btn-sm" (click)="_sceneLoader.turnOffAmbientLight()">Light off</button>
    <input type="color" [value]="_sceneLoader.ambientColor" (change)="_sceneLoader.setAmbientColor($event.target.value)">
    Current color: {{_sceneLoader.ambientColor}}
  </div>
  <viewer style="height: 100%; width: 100%"></viewer>`,
  providers: [RenderService, SceneService]
})
export class AppComponent {

  constructor(private _renderService: RenderService, private _sceneLoader: SceneService) {
  }

}