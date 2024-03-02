import { ControllableEntity } from "./controllableEntity";

class Bird implements ControllableEntity {
  private score: number;

  constructor(score: number) {
    this.score = 0;
  }
  evaluateFitness(): void {
    throw new Error("Method not implemented.");
  }
}
