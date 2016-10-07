/**
 * Created by stefan on 9/16/16.
 */
import { Component, Input, OnInit } from '@angular/core';
import { ViewerComponent } from "./viewer.component";
import {RenderService} from "./render.service";
import {SceneService} from "./scene.service";

@Component({
  selector: 'point-light-control',
  styles: [`
    .col-sm-3 {
      padding: 0;
    }

  `],
  template: `
  <div class="col-sm-3">
    <h4>Point Light</h4>
    <button class="btn btn-sm {{lightState ? 'active' : ''}}" data-toggle="button" (click)="toggleLight()">Toggle light</button>
    X: <input type="number" step="1" min="-1000" max="1000" [value]="pointLight.position.x" (change)="pointLight.position.x = $event.target.value">
    Y: <input type="number" step="1" min="-1000" max="1000" [value]="pointLight.position.y" (change)="pointLight.position.y = $event.target.value">
    Z: <input type="number" step="1" min="-1000" max="1000" [value]="pointLight.position.z" (change)="pointLight.position.z = $event.target.value">
    <input type="color" [value]="color" (change)="setColor($event.target.value)">
    Intensity: <input type="number" step="0.05" min="0" max="1" [value]="pointLight.intensity" (change)="pointLight.intensity = $event.target.value">
  </div>
  `
})
export class PointLightControlComponent implements OnInit {

  @Input() pointLight;
  private lightState: boolean;
  public color: string;

  constructor() {
    this.lightState = true;
  }

  public toggleLight() {
    this.lightState = !this.lightState;
    this.pointLight.intensity = this.lightState ? 1 : 0;
  }

  public ngOnInit() {
    this.color = this.pointLight.color.getHexString();
  }

  public setColor(color: string) {
    this.pointLight.color.set(color);
  }

}