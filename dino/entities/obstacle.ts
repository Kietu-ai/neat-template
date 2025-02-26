import * as THREE from "three";
import { ENTITIES_INIT_Y_POS } from "../constants";

export class Obstacle {
  public position: THREE.Vector3;

  constructor() {
    this.position = new THREE.Vector3(20, ENTITIES_INIT_Y_POS, 0);
  }

  update(velocity: number) {
    this.position.x -= velocity;
  }
}
