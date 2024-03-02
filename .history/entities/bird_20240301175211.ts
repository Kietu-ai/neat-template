import { ControllableEntity } from "./controllableEntity";

class Bird implements ControllableEntity {
  private score: number;

  constructor() {
    this.score = 0;
  }
  evaluateFitness(): void {
    return this.score * this.score;
  }

  update() {}
}
