import { Genome } from "../../neat/genome";
import { NeuralNetwork } from "../../neat/neuralNetwork";
import * as THREE from "three";
import { Obstacle } from "./obstacle";
import { ENTITIES_INIT_Y_POS } from "../constants";

export class Player extends Genome {
  private score: number;
  private velocity: number;
  private gravity: number;
  private jumpStrength: number;
  position: THREE.Vector3;
  private onGround: boolean;

  constructor(brain: NeuralNetwork) {
    super(brain);
    this.position = new THREE.Vector3(-10, ENTITIES_INIT_Y_POS, 0);
    this.score = 0;
    this.velocity = 0;
    this.gravity = -0.04;
    this.jumpStrength = 0.8;
    this.onGround = true;
  }

  update() {
    this.score++;
    if (!this.onGround) {
      this.velocity += this.gravity;
      this.position.y += this.velocity;
      if (this.position.y <= ENTITIES_INIT_Y_POS) {
        this.velocity = 0;
        this.position.y = ENTITIES_INIT_Y_POS;
        this.onGround = true;
      }
    }
  }

  jump() {
    if (this.onGround) {
      this.velocity = this.jumpStrength;
      this.onGround = false;
    }
  }

  hit(obstacle: Obstacle): boolean {
    const dinoX = this.position.x;
    const dinoY = this.position.y;
    const obstacleX = obstacle.position.x;
    const obstacleY = obstacle.position.y;

    const distanceX = Math.abs(dinoX - obstacleX);
    const distanceY = Math.abs(dinoY - obstacleY);

    return distanceX < 1 && distanceY < 1;
  }

  getScore(): number {
    return this.score;
  }

  evaluateFitness() {
    this.fitnessScore = this.score * this.score;
  }

  findClosestObstacle(obstacles: Obstacle[]): Obstacle | null {
    let closestObstacle: Obstacle | null = null;
    let minDistance = Infinity;

    for (const obstacle of obstacles) {
      const distance = obstacle.position.x - this.position.x;

      if (distance > 0 && distance < minDistance) {
        minDistance = distance;
        closestObstacle = obstacle;
      }
    }

    return closestObstacle;
  }
  think(obstacles: Obstacle[]): void {
    const closestObstacle = this.findClosestObstacle(obstacles);
    const onTheGroundValue = this.onGround ? 1 : 0;
    const outputs = this.predict([
      this.position.y,
      this.position.x,
      closestObstacle?.position.x || 0,
      closestObstacle?.position.y || 0,
      onTheGroundValue,
    ]);
    const maxIndex = outputs.indexOf(Math.max(...outputs));
    switch (maxIndex) {
      case 0:
        this.jump();
        break;
      case 1:
        //Other action
        break;
      default:
    }
  }
}
