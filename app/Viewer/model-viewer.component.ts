/**
 * Created by stefan on 9/16/16.
 */
import { Component, OnInit, ElementRef } from '@angular/core';
import { RenderService } from "./render.service";
import {SceneService} from "./scene.service";

@Component({
    selector: 'model-viewer',
    providers: [RenderService, SceneService],
    template: `
    <scene-control></scene-control>
    <viewer style="height: 100%; width: 100%"></viewer>
    `
})
export class ModelViewerComponent {
    constructor(private renderService: RenderService, private sceneService: SceneService) {

    }
}