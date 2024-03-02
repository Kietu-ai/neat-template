import { ControllableEntity } from "./controllableEntity";

export class Bird implements ControllableEntity {
  private score: number;

  constructor() {
    this.score = 0;
  }
  evaluateFitness(): number {
    return this.score * this.score;
  }

  update() {}
}
