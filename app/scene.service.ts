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
  public ambientColor: string;


  private objects: IfcGeometryElement[];

  constructor() {
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color( 0xeaeaea );
    this.objects = [];
  }

  public loadScene() {

    this.setupLights();

    this.loadObjects();
  }

  public turnOffAmbientLight() {
    this.ambientLight.intensity = 0;
  }

  public turnOnAmbientLight() {
    this.ambientLight.intensity = 1;
  }

  public setAmbientColor(color: string) {
    this.ambientColor = color;
    this.ambientLight.color = new THREE.Color(color);
  }

  private setupLights() {
    // Lights
    this.ambientLight = new THREE.AmbientLight(0xcccccc);
    this.scene.add(this.ambientLight);

    this.ambientColor = "#cccccc";

    this.pointLight1 = new THREE.PointLight(0xffffff);
    this.pointLight1.position.set(300, 0, 300);
    this.scene.add(this.pointLight1);

  }

  public loadObjects() {
    // get the objects from bim server
    let geometry = new THREE.BoxGeometry(20, 20, 20);
    let material = new THREE.MeshPhongMaterial();
    material.color = new Color(0xa0af50);
    material.shininess = 50;
    material.wireframe = true;

    this.scene.rotateX(0.20);
    this.scene.rotateY(0.35);

    // Adding new geometry to the objects collection and to the scene;
    this.objects[0] = new IfcGeometryElement("1", geometry, material);
    this.scene.add(this.objects[0]);
  }

}