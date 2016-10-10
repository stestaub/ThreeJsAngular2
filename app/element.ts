import {inherits} from "util";
import * as THREE from "three";
import MeshPhongMaterial = THREE.MeshPhongMaterial;

/**
 * Created by stefan on 9/16/16.
 */
export enum ElementDisplayState {
  HIDDEN, VISIBLE, WIREFRAME
}
export class IfcGeometryElement extends THREE.Mesh {

  public ifcId: string;

  private deselectedColor: string;
  private selectedColor: string;
  private selected: boolean;
  public clippingState: boolean;

  public display_state: ElementDisplayState;

  public constructor(ifcId: string, geometry: THREE.Geometry, material: THREE.Material ) {
    super(geometry, material);
    this.ifcId = ifcId;
    this.selectedColor = '#ab00cf';
    this.display_state = ElementDisplayState.VISIBLE;
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

  public toggleDisplay() {
    let _material: MeshPhongMaterial = <MeshPhongMaterial>this.material;

    switch(this.display_state) {
      case ElementDisplayState.HIDDEN:
        _material.visible = true;
        this.display_state = ElementDisplayState.VISIBLE;
        break;
      case ElementDisplayState.VISIBLE:
        _material.wireframe = true;
        this.display_state = ElementDisplayState.WIREFRAME;
        break;
      case ElementDisplayState.WIREFRAME:
        _material.wireframe = false;
        _material.visible = false;
        this.display_state = ElementDisplayState.HIDDEN;
    }
  }

}