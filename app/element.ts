import {inherits} from "util";
import * as THREE from "three";

/**
 * Created by stefan on 9/16/16.
 */

export class IfcGeometryElement extends THREE.Mesh {

  public ifcId: string;

  public constructor(ifcId: string, geometry: THREE.Geometry, material: THREE.Material ) {
    super(geometry, material);
    this.ifcId = ifcId;
  }



}