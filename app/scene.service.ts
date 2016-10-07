import * as THREE from "three";
import { Injectable }  from '@angular/core';

import WebGLRenderer = THREE.WebGLRenderer;
import Scene = THREE.Scene;
import PerspectiveCamera = THREE.PerspectiveCamera;
import Mesh = THREE.Mesh;
import Color = THREE.Color;
import {IfcGeometryElement} from "./element";

@Injectable()
export class SceneService {

  public scene: Scene;
  public pointLight1: THREE.PointLight;
  public pointLight2: THREE.PointLight;
  public ambientLight: THREE.AmbientLight;
  public hemisphereLight: THREE.HemisphereLight;
  public selectedElement: IfcGeometryElement;
  public clippingPlane: THREE.Plane;
  private clippingActive: boolean;


  private objects: IfcGeometryElement[];

  constructor() {
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color( 0xeaeaea );
    this.objects = [];
    this.selectedElement = null;
    this.clippingPlane = new THREE.Plane( new THREE.Vector3( 0, -1, 0 ), 10 );
    this.setupLights();
    this.clippingActive = false;
  }

  public loadScene() {
    this.loadObjects();
  }

  private setupLights() {
    // Lights
    this.ambientLight = new THREE.AmbientLight(0xcccccc);
    this.scene.add(this.ambientLight);
    this.ambientLight.intensity = 0.3;

    this.hemisphereLight = new THREE.HemisphereLight( 0xffffbb, 0x080820, 1 );
    this.scene.add( this.hemisphereLight );

    this.pointLight1 = new THREE.PointLight(0xffffff);
    this.pointLight1.position.set(300, 0, 300);
    this.scene.add(this.pointLight1);

    this.pointLight2 = new THREE.PointLight(0xffffff);
    this.pointLight2.position.set(-100,-233, 300);
    this.scene.add(this.pointLight2);

  }

  public toggleClipping() {
    if(this.clippingActive) {
      this.disableClipping();
      this.clippingActive = false;
    }
    else {
      this.clipSelection();
      this.clippingActive = true;
    }
  }

  public clipSelection() {
    if(this.selectedElement != null) {
      this.selectedElement.material.clippingPlanes = [ this.clippingPlane ]
    }
  }

  public disableClipping() {
    if(this.selectedElement != null) {
      this.selectedElement.material.clippingPlanes = [];
    }
  }

  // Load some dummy objects here. Later we would call bim server to load the objects from
  public loadObjects() {
    // get the objects from bim server
    let geometry = new THREE.SphereBufferGeometry(20, 200, 200);
    let material = new THREE.MeshPhongMaterial();
    material.color = new Color(0xa0af50);
    material.shading = THREE.SmoothShading;
    material.side = THREE.DoubleSide;
    // Adding new geometry to the objects collection and to the scene;
    this.objects[0] = new IfcGeometryElement("1", geometry, material);
    this.objects[0].position.set(-12, 8, -20);
    this.scene.add(this.objects[0]);


    let geometry = new THREE.BoxGeometry(20, 20, 20);
    let material = new THREE.MeshPhongMaterial();
    material.color = new Color(0xa0af50);
    material.shading = THREE.SmoothShading;
    material.side = THREE.DoubleSide;
    // Adding new geometry to the objects collection and to the scene;
    this.objects[1] = new IfcGeometryElement("2", geometry, material);
    this.objects[1].position.set(29, 15, 5);
    this.scene.add(this.objects[1]);
  }

  selectElement(currentObject:IfcGeometryElement):any {
    if(this.selectedElement != null) {
      this.selectedElement.deselect();
    }

    if(currentObject != null) {
      currentObject.select();
    }
    this.selectedElement = currentObject;
  }
}