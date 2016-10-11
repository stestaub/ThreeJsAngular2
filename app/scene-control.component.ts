/**
 * Created by stefan on 9/16/16.
 */
import { TabsModule } from 'ng2-bootstrap/components/tabs';
import { Component } from '@angular/core';
import { ViewerComponent } from "./viewer.component";
import {RenderService} from "./render.service";
import {SceneService} from "./scene.service";

@Component({
  selector: 'scene-control',
  styles: [`
    .sceneControls {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      background-color: #fff;
      box-shadow: 5px 5px 2px #aaa;
    }
  `],
  template: `
  <div class="container-fluid sceneControls">
    <tabset>
      <tab heading="Common">
        <p [textContent]="'Current Object: ' + ((renderService.currentObject != null) ? renderService.currentObject.ifcId : '')"></p>
        <p [textContent]="'Selected Object: ' + ((sceneLoader.selectedElement != null) ? sceneLoader.selectedElement.ifcId : '')"></p>
        <button (click)="toggleView()">Toggle View</button>
        <login-component></login-component>
      </tab>
      <tab heading="Lights">
        <div class="row">
          <ambient-light-control [title]="'Ambient'" [ambientLight] = "sceneLoader.ambientLight"></ambient-light-control>
          <ambient-light-control [title]="'Hemisphere'" [ambientLight] = "sceneLoader.hemisphereLight"></ambient-light-control>
          <point-light-control [pointLight] = "sceneLoader.pointLight1"></point-light-control>
          <point-light-control [pointLight] = "sceneLoader.pointLight2"></point-light-control>
        </div>
      </tab>
      <tab heading="Clipping">
        <button (click)="sceneLoader.toggleClipping()">Toggle Clipping</button>
        <input type="number" step="0.5" [value]="sceneLoader.clippingPlane.constant" (change)="sceneLoader.clippingPlane.constant = $event.target.value">
      </tab>
      <tab heading="Camera Control">
        Pan Spped: <input type="number" step="0.1" [value]="renderService.orbitControls.keyPanSpeed" (change)="renderService.orbitControls.keyPanSpeed = $event.target.value">
        Rotation Speed: <input type="number" step="0.1" [value]="renderService.orbitControls.rotateSpeed" (change)="renderService.orbitControls.rotateSpeed = $event.target.value">
        Zoom Speed: <input type="number" step="0.1" [value]="renderService.orbitControls.zoomSpeed" (change)="renderService.orbitControls.zoomSpeed = $event.target.value">
        <button (click)="renderService.orbitControls.reset()">Reset Camera</button>
      </tab>
    </tabset>
  </div>
  `
})
export class SceneControlComponent {

  constructor(private renderService: RenderService, private sceneLoader: SceneService) {

  }

  public toggleView() {
    if(this.sceneLoader.selectedElement != null) {
      this.sceneLoader.selectedElement.toggleDisplay();
    }
  }

}