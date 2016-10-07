import {inherits} from "util";
import * as THREE from "three";
import MeshPhongMaterial = THREE.MeshPhongMaterial;

/**
 * Created by stefan on 9/16/16.
 */

export class IfcGeometryElement extends THREE.Mesh {

  public ifcId: string;

  private deselectedColor: string;
  private selectedColor: string;
  private selected: boolean;
  public clippingState: boolean;

  public constructor(ifcId: string, geometry: THREE.Geometry, material: THREE.Material ) {
    super(geometry, material);
    this.ifcId = ifcId;
    this.selectedColor = '#ab00cf';
  }

  public select() {
    this.deselectedColor = (<MeshPhongMaterial>this.material).color.getHexString();
    console.log(this.deselectedColor);
    (<MeshPhongMaterial>this.material).color.set(this.selectedColor);
    this.selected = true;
  }

  public deselect() {
    (<MeshPhongMaterial>this.material).color.set('#' + this.deselectedColor);
    this.selected = false;
  }



}