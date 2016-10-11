/// <reference path="../typings/globals/three-trackballcontrols/index.d.ts" />

import { Injectable } from '@angular/core';
import { Inject } from '@angular/core';

import * as THREE from "three";
import * as TWEEN from "tween.js";

import WebGLRenderer = THREE.WebGLRenderer;
import Scene = THREE.Scene;
import PerspectiveCamera = THREE.PerspectiveCamera;
import Mesh = THREE.Mesh;
import Color = THREE.Color;
import {SceneService} from "./scene.service";
import Raycaster = THREE.Raycaster;
import Vector2 = THREE.Vector2;
import {IfcGeometryElement} from "./element";
import {Key} from "readline";
import Vector3 = THREE.Vector3;

// this was the only way I found to get compiler working.
var OrbitControls = require("three-orbit-controls/orbit-controls")(THREE);


@Injectable()
export class RenderService {
  // private stats: Stats;
  private scene: Scene;
  private camera: PerspectiveCamera;
  private renderer: WebGLRenderer;
  private sphere: Mesh;
  private sceneLoader: SceneService;

  private raycaster: Raycaster;
  public mouse: Vector2;

  public currentObject: IfcGeometryElement;
  public trackballControls;
  public orbitControls;
  private currentIntersection: Vector3;

  constructor(@Inject(SceneService) sceneLoader:SceneService) {
    this.sceneLoader = sceneLoader;
    this.mouse = new THREE.Vector2(0,0);
  }

  public init(container: HTMLElement) {
    const width = window.innerWidth;
    const height = window.innerHeight;

    this.renderer = new THREE.WebGLRenderer({antialias: true});
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(width, height);

    this.raycaster = new THREE.Raycaster();

    // Set camera
    this.camera = new THREE.PerspectiveCamera(45, width/height);
    this.camera.position.set(0, 0, 100);


    // Add the renderer to the container.
    container.appendChild(this.renderer.domElement);

    this.sceneLoader.loadScene();
    // get a shortcut to the scene
    this.scene = this.sceneLoader.scene;

    // Enable local clipping
    this.renderer.localClippingEnabled = true;

    this.registerEvents();

    this.orbitControls = new OrbitControls( this.camera, this.renderer.domElement );

    // start animation
    this.animate();
    this.render();
  }

  private registerEvents() {
    // track mouse movements to check for intersections and highlight them
    window.addEventListener( 'mousemove', (event) => this.onMouseMove(event), false );

    // bind to window resizes
    window.addEventListener('resize', _ => this.onResize());

    // we will only listen to click events on the canvas
    this.renderer.domElement.addEventListener('dblclick', _ => this.selectCurrentObject());
  }

  private onMouseMove( event ) {

    // calculate mouse position in normalized device coordinates
    // (-1 to +1) for both components
    this.mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
    this.mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;

  };

  public updateScale(newScale: number) {
    const that = this;
    new TWEEN.Tween({scale: this.sphere.scale.x})
      .to({scale: newScale}, 1000)
      .easing(TWEEN.Easing.Elastic.InOut)
      .onUpdate(function () {
        that.scene.scale.set(this.scale, this.scale, this.scale);
      })
      .start();
  }

  // The animation loop. This method is called on each animation frame.
  public animate() {
    window.requestAnimationFrame(_ => this.animate());
    TWEEN.update();

    this.raycaster.setFromCamera( this.mouse, this.camera );
    //calculate objects intersecting the picking ray
    var intersects = this.raycaster.intersectObjects( this.scene.children );

    if(intersects.length > 0) {
      this.currentIntersection = intersects[0].point;
      console.log('Look at: ' + this.currentIntersection.x + ', ' + this.currentIntersection.y + ', ' + this.currentIntersection.z);
      this.currentObject = <IfcGeometryElement>intersects[0].object;
    }
    else {
      this.currentObject = null;
    }

    this.orbitControls.update();

    this.render();
  }

  public render() {
    this.renderer.render(this.scene, this.camera);
  }

  public onResize() {
    const width = window.innerWidth;
    const height = window.innerHeight;

    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();

    this.renderer.setSize(width, height);
    this.render();
  }

  // TODO: Make this more smooth...
  // TODO: Check if not in rotation or pan mode
  private selectCurrentObject():any {
    this.sceneLoader.selectElement(this.currentObject);
    if(this.currentObject != null) {
      this.orbitControls.target = this.currentIntersection;
    }
  }
}