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

  think() {
    const outputs = genome.getPrediction();
  }

  predict(genome: Genome<Bird>) {}
}
