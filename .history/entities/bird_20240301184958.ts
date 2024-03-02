import { ControllableEntity } from "./controllableEntity";
import { Genome } from "./genome";

export class Bird implements ControllableEntity {
  private score: number;

  constructor() {
    this.score = 0;
  }

  evaluateFitness(): number {
    return this.score * this.score;
  }

  update() {
    this.score++;
  }

  predict(inputs: number[]): [] {
    throw new Error("Method not implemented.");
  }
}
