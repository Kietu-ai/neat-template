import { ControllableEntity } from "./controllableEntity";

class Bird implements ControllableEntity {
  private score: number;

  constructor() {
    this.score = 0;
  }
  evaluateFitness(): number {
    return this.score * this.score;
  }

  update() {}
}
