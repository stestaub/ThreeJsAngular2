/**
 * Created by stefan on 9/16/16.
 */
import { Component, Input, OnInit } from '@angular/core';
import { ViewerComponent } from "./viewer.component";
import {RenderService} from "./render.service";
import {SceneService} from "./scene.service";

@Component({
  selector: 'ambient-light-control',
  template: `
    <button class="btn btn-sm {{lightState ? 'active' : ''}}" data-toggle="button" (click)="toggleLight()">Toggle light</button>
    <input type="color" [value]="color" (change)="setAmbientColor($event.target.value)">
    <input type="number" step="0.05" min="0" max="1" [value]="ambientLight.intensity" (change)="ambientLight.intensity = $event.target.value">
  `
})
export class AmbientLightControlComponent implements OnInit {

  @Input() ambientLight;
  private lightState: boolean;
  public color: string;

  constructor() {
    this.lightState = true;
  }

  public toggleLight() {
    this.lightState = !this.lightState;
    this.ambientLight.intensity = this.lightState ? 1 : 0.1;
  }

  public ngOnInit() {
    this.color = this.ambientLight.color.getHexString();
    console.log("color: " + this.color);
  }

  public setAmbientColor(color: string) {
    this.ambientLight.color.set(color);
  }

}