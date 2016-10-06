/**
 * Created by stefan on 9/16/16.
 */
import { Component, OnInit, ElementRef } from '@angular/core';
import { RenderService } from "./render.service";
import {SceneService} from "./scene.service";

@Component({
  selector: 'viewer',
  template: ''
})
export class ViewerComponent implements OnInit {

  constructor(private _renderService: RenderService, private _domRef: ElementRef) {
  }

  public updateScale(newScale: number) {
    this._renderService.updateScale(newScale);
  }

  public ngOnInit() {
    var element = this._domRef.nativeElement;
    this._renderService.init(element);
  }

}